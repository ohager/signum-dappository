import { applicationTokenRepository } from './repositories/applicationTokenRepository.js'
import { dispatchEvent } from '../utils/dispatchEvent'
import { TokenContract, Vars } from '../context'
import { ApplicationToken } from './repositories/models/applicationToken'
import { Events } from '../utils/events'
import { accountService } from './accountService'
import { getAccountIdFromPublicKey } from '@signumjs/crypto'
import { unconfirmedTokenService } from './unconfirmedTokenService'
import { finishLoading, startLoading } from '../features/_common/appStore'
import { Amount } from '@signumjs/util'
import { ledgerService } from './ledgerService'

const MaxParallelFetches = 6

export class ApplicationTokenService {
    constructor(tokenRepository = applicationTokenRepository) {
        this._tokenRepository = tokenRepository
        this._dispatch = dispatchEvent
    }

    _fetchContractDetailsChunked(contractIds) {
        return Promise.all(contractIds.map(cid => ledgerService.client.contract.getContract(cid)))
    }

    async _fetchContractIds() {
        const requests = Vars.ContractMachineCodeHashes.map(machineCodeHash =>
            ledgerService.client.contract.getAllContractIds({ machineCodeHash }),
        )
        const contractIdArray = await Promise.all(requests)
        return contractIdArray.flatMap(({ atIds }) => atIds)
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
        return this._tokenRepository.get()
    }

    async toggleFavorite(id) {
        const { favorite } = await this._tokenRepository.get(id)
        await this._tokenRepository.update(id, { favorite: !favorite })
    }

    getActivationCostsPlanck() {
        return Amount.fromSigna(TokenContract.ActivationCosts).getPlanck()
    }

    async _callContractMethod(token, passphraseOrWallet, methodHash, methodArgs) {
        try {
            startLoading()
            const contractId = token.at
            const isUsingWallet = !!passphraseOrWallet.connection
            let signPrivateKey = undefined
            let publicKey = ''
            if (isUsingWallet) {
                publicKey = passphraseOrWallet.connection.publicKey
            } else {
                const keys = accountService.getKeys(passphraseOrWallet)
                signPrivateKey = keys.signPrivateKey
                publicKey = keys.publicKey
            }
            const feeValue = await accountService.getSuggestedFee()
            const result = await ledgerService.client.contract.callContractMethod({
                amountPlanck: this.getActivationCostsPlanck(),
                contractId,
                methodHash,
                methodArgs,
                feePlanck: feeValue.getPlanck(),
                senderPrivateKey: signPrivateKey,
                senderPublicKey: publicKey,
            })
            if (isUsingWallet) {
                await passphraseOrWallet.confirm(result.unsignedTransactionBytes)
            }
        } catch (e) {
            this._dispatch(Events.Error, e.message)
            throw e
        } finally {
            finishLoading()
        }
    }

    async deactivateToken(token, passphraseOrWallet) {
        await this._callContractMethod(
            token,
            passphraseOrWallet,
            TokenContract.MethodHash.deactivate,
        )
        this._dispatch(Events.Success, 'Token deactivated')
    }

    async transferToken(token, passphraseOrWallet, newOwnerId) {
        await this._callContractMethod(
            token,
            passphraseOrWallet,
            TokenContract.MethodHash.transfer,
            // eslint-disable-next-line prettier/prettier
      [newOwnerId],
        )
        this._dispatch(Events.Success, 'Token transferred successfully')
    }

    async registerToken(tokenData, passphraseOrWallet) {
        try {
            startLoading()
            const isUsingWallet = !!passphraseOrWallet.connection
            let signPrivateKey = undefined
            let publicKey = ''
            if (isUsingWallet) {
                publicKey = passphraseOrWallet.connection.publicKey
            } else {
                const keys = accountService.getKeys(passphraseOrWallet)
                signPrivateKey = keys.signPrivateKey
                publicKey = keys.publicKey
            }

            const accountId = getAccountIdFromPublicKey(publicKey)
            const balanceSigna = await accountService.getBalance(accountId)
            if (balanceSigna.less(TokenContract.CreationFee)) {
                throw new Error(
                    `Accounts balance needs at least ${TokenContract.CreationFee.toString()}`,
                )
            }

            let transaction = await ledgerService.client.contract.publishContractByReference({
                referencedTransactionHash: TokenContract.Reference,
                activationAmountPlanck: this.getActivationCostsPlanck(),
                feePlanck: TokenContract.CreationFee.getPlanck(),
                description: JSON.stringify(tokenData),
                name: TokenContract.Name,
                senderPrivateKey: signPrivateKey,
                senderPublicKey: publicKey,
            })

            let unconfirmedTokenId = transaction.transaction
            if (isUsingWallet) {
                const { transactionId } = await passphraseOrWallet.confirm(
                    transaction.unsignedTransactionBytes,
                )
                unconfirmedTokenId = transactionId
            }

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
