import { applicationTokenRepository } from '../repositories/applicationTokenRepository.js'
import { dispatchEvent } from '../utils/dispatchEvent'
import { BurstApi } from '../utils/burstApi.js'
import { Config } from '../config.js'
import { ApplicationToken } from '../repositories/models/applicationToken'
import { Events } from '../utils/events'
import { accountService } from './accountService'
import { getAccountIdFromPublicKey } from '@burstjs/crypto'
import { TokenContract } from './tokenContract'
import { unconfirmedTokenService } from './unconfirmedTokenService'
import { BurstValue } from '@burstjs/util'
import { finishLoading, startLoading } from '../components/appStore'

const MaxParallelFetches = 6

export class ApplicationTokenService {

    constructor(tokenRepository = applicationTokenRepository) {
        this._tokenRepository = tokenRepository
        this._dispatch = dispatchEvent
    }

    _fetchContractDetailsChunked(contractIds) {
        return Promise.all(
            contractIds.map(cid => BurstApi.contract.getContract(cid)),
        )
    }

    async _fetchContractIds() {
        const { atIds } = await BurstApi.contract.getAllContractIds(null)
        const firstContractId = atIds.lastIndexOf(Config.FirstApplicationContractId)
        return atIds.slice(firstContractId - 1)
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
        return await this.getCollection().where('at').equals(tokenId).first()
    }

    async getTokens() {
        return await this._tokenRepository.get()
    }

    async toggleFavorite(id) {
        const { favorite } = await this._tokenRepository.get(id)
        await this._tokenRepository.update(id, { favorite: !favorite })
    }

    getActivationCostsPlanck() {
        return BurstValue.fromBurst(TokenContract.ActivationCosts).getPlanck()
    }

    async _callContractMethod(token, passphrase, methodHash, methodArgs) {
        try {
            startLoading()
            const  contractId = token.at
            const { signPrivateKey, publicKey } = accountService.getKeys(passphrase)
            const accountId = getAccountIdFromPublicKey(publicKey)
            const feeValue = await accountService.getSuggestedFee()
            await BurstApi.contract.callContractMethod({
                amountPlanck: this.getActivationCostsPlanck(),
                contractId,
                methodHash,
                methodArgs,
                feePlanck: feeValue.getPlanck(),
                senderPrivateKey: signPrivateKey,
                senderPublicKey: publicKey,
            })
            await unconfirmedTokenService.addToken({ at: contractId, creator: accountId, ...token })
        } catch (e) {
            this._dispatch(Events.Error, e.message)
        } finally {
            finishLoading()
        }

    }

    async deactivateToken(token, passphrase) {
        await this._callContractMethod(token, passphrase, TokenContract.MethodHash.deactivate)
        this._dispatch(Events.Success, 'Token deactivated')
    }

    async transferToken(contractId, passphrase, newOwnerId) {
        await this._callContractMethod(
            contractId,
            passphrase,
            TokenContract.MethodHash.deactivate,
            [newOwnerId]
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
                throw new Error(`Accounts balance needs at least ${TokenContract.CreationFee.toString()}`)
            }

            let { transaction: unconfirmedTokenId } = await BurstApi.contract.publishContract({
                codeHex: TokenContract.Bytecode,
                activationAmountPlanck: this.getActivationCostsPlanck(),
                description: JSON.stringify(tokenData),
                name: TokenContract.Name,
                senderPrivateKey: signPrivateKey,
                senderPublicKey: publicKey,
                isCIP20Active: true,
            })

            await unconfirmedTokenService.addToken({ at: unconfirmedTokenId, creator: accountId, ...tokenData })
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
