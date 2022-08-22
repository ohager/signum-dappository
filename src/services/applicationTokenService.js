import { applicationTokenRepository } from './repositories/applicationTokenRepository.js'
import { dispatchEvent } from '../utils/dispatchEvent'
import { Ledger, TokenContract, Vars } from '../context'
import { ApplicationToken } from './repositories/models/applicationToken'
import { Events } from '../utils/events'
import { accountService } from './accountService'
import { getAccountIdFromPublicKey } from '@signumjs/crypto'
import { unconfirmedTokenService } from './unconfirmedTokenService'
import { finishLoading, startLoading } from '../features/_common/appStore'
import { Amount } from '@signumjs/util'

const MaxParallelFetches = 6

export class ApplicationTokenService {
    constructor(tokenRepository = applicationTokenRepository) {
        this._tokenRepository = tokenRepository
        this._dispatch = dispatchEvent
    }

    _fetchContractDetailsChunked(contractIds) {
        return Promise.all(contractIds.map(cid => Ledger.contract.getContract(cid)))
    }

    async _fetchContractIds() {
        const { atIds } = await Ledger.contract.getAllContractIds({
            machineCodeHash: Vars.ContractMachineCodeHash,
        })
        return atIds
    }

    async syncTokens() {
        this._dispatch(Events.Start)
        try {
            const contractIds = await this._fetchContractIds()
            const total = contractIds.length
            this._dispatch(Events.Progress, { total, processed: 0 })
            while (contractIds.length) {
                const chunkedIds = []
                for (let i = 0; i < MaxParallelFetches; ++i) {
                    const id = contractIds.pop()
                    if (id) {
                        chunkedIds.push(id)
                    }
                }
                const contracts = await this._fetchContractDetailsChunked(chunkedIds)
                const appTokens = contracts
                    .filter(contract => contract.name.startsWith(TokenContract.Name))
                    .filter(contract => !contract.dead)
                    .map(ApplicationToken.mapFromContract)
                await this._tokenRepository.upsertBulk(appTokens)
                this._dispatch(Events.Progress, { total, processed: total - contractIds.length })
            }
        } catch (e) {
            this._dispatch(Events.Error, e.message)
        } finally {
            this._dispatch(Events.Finish)
        }
    }

    getCollection() {
        return this._tokenRepository.collection
    }

    async getToken(tokenId) {
        return this.getCollection().where('at').equals(tokenId).first()
    }

    async getTokens() {
        return await this._tokenRepository.get()
    }

    async toggleFavorite(id) {
        const { favorite } = await this._tokenRepository.get(id)
        await this._tokenRepository.update(id, { favorite: !favorite })
    }

    getActivationCostsPlanck() {
        return Amount.fromSigna(TokenContract.ActivationCosts).getPlanck()
    }

    async _callContractMethod(token, passphrase, methodHash, methodArgs) {
        try {
            startLoading()
            const contractId = token.at
            const { signPrivateKey, publicKey } = accountService.getKeys(passphrase)
            const feeValue = await accountService.getSuggestedFee()
            await Ledger.contract.callContractMethod({
                amountPlanck: this.getActivationCostsPlanck(),
                contractId,
                methodHash,
                methodArgs,
                feePlanck: feeValue.getPlanck(),
                senderPrivateKey: signPrivateKey,
                senderPublicKey: publicKey,
            })
        } catch (e) {
            this._dispatch(Events.Error, e.message)
            throw e
        } finally {
            finishLoading()
        }
    }

    async deactivateToken(token, passphrase) {
        await this._callContractMethod(token, passphrase, TokenContract.MethodHash.deactivate)
        this._dispatch(Events.Success, 'Token deactivated')
    }

    async transferToken(token, passphrase, newOwnerId) {
        await this._callContractMethod(
            token,
            passphrase,
            TokenContract.MethodHash.transfer,
            // eslint-disable-next-line prettier/prettier
            [newOwnerId],
        )
        this._dispatch(Events.Success, 'Token transferred successfully')
    }

    async registerToken(tokenData, passphrase) {
        try {
            startLoading()
            const { publicKey, signPrivateKey } = accountService.getKeys(passphrase)
            const accountId = getAccountIdFromPublicKey(publicKey)
            const balanceBurst = await accountService.getBalance(accountId)
            if (balanceBurst.less(TokenContract.CreationFee)) {
                throw new Error(
                    `Accounts balance needs at least ${TokenContract.CreationFee.toString()}`,
                )
            }

            let { transaction: unconfirmedTokenId } = await Ledger.contract.publishContract({
                codeHex: TokenContract.Bytecode,
                activationAmountPlanck: this.getActivationCostsPlanck(),
                description: JSON.stringify(tokenData),
                name: TokenContract.Name,
                senderPrivateKey: signPrivateKey,
                senderPublicKey: publicKey,
                isCIP20Active: true,
            })

            // TODO: better set a state within the collection and not using an additional repo
            await unconfirmedTokenService.addToken({
                at: unconfirmedTokenId,
                creator: accountId,
                ...tokenData,
            })
            // triggering a token store update
            this._dispatch(Events.Progress, { total: 1, processed: 1 })
            this._dispatch(Events.Success, 'Token successfully generated')
            return unconfirmedTokenId
        } catch (e) {
            this._dispatch(Events.Error, e.message)
            throw e
        } finally {
            finishLoading()
        }
    }
}

export const applicationTokenService = new ApplicationTokenService()
