import { applicationTokenRepository } from '../repositories/applicationTokenRepository.js'
import { dispatchEvent } from '../utils/dispatchEvent'
import { BurstApi } from '../utils/burstApi.js'
import { Config } from '../config.js'
import { ApplicationToken } from '../repositories/models/applicationToken'
import { Events } from '../utils/events'
import { accountService } from './accountService'
import { getAccountIdFromPublicKey } from '@burstjs/crypto'
import { TokenContract } from './tokenContract'
import { inactiveTokensRepository } from '../repositories/inactiveTokensRepository'

const MaxParallelFetches = 6

export class ApplicationTokenService {

    constructor(repository = applicationTokenRepository) {
        this._repository = repository
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
                await this._repository.upsertBulk(appTokens)
                this._dispatch(Events.Progress, { total, processed: total - contractIds.length })
            }
        } catch (e) {
            this._dispatch(Events.Error, e.message)
        } finally {
            this._dispatch(Events.Finish)
        }
    }

    getCollection() {
        return this._repository.collection
    }

    async getToken(tokenId) {
        return await this.getCollection().where('at').equals(tokenId).first()
    }

    async getTokens() {
        return await this._repository.get()
    }

    async toggleFavorite(id) {
        const { favorite } = await this._repository.get(id)
        await this._repository.update(id, { favorite: !favorite })
    }

    async deactivateToken(contractId, passphrase) {
        try {
            const { signPrivateKey, publicKey } = accountService.getKeys(passphrase)
            const feeValue = await accountService.getSuggestedFee()
            await BurstApi.contract.callContractMethod({
                amountPlanck: TokenContract.ActivationCosts.getPlanck(),
                contractId,
                feePlanck: feeValue.getPlanck(),
                methodHash: TokenContract.MethodHash.deactivate,
                senderPrivateKey: signPrivateKey,
                senderPublicKey: publicKey,
            })
        } catch (e) {
            this._dispatch(Events.Error, e.message)
        }
    }

    async transferToken(contractId, passphrase) {
        try {
            const { signPrivateKey, publicKey } = this._getKeys(passphrase)
            const feeValue = await this._getSuggestedFee()
            await BurstApi.contract.callContractMethod({
                amountPlanck: TokenContract.ActivationCosts.getPlanck(),
                contractId,
                feePlanck: feeValue.getPlanck(),
                methodHash: TokenContract.MethodHash.deactivate,
                senderPrivateKey: signPrivateKey,
                senderPublicKey: publicKey,
            })
        } catch (e) {
            this._dispatch(Events.Error, e.message)
        }
    }

    async registerToken(tokenData, passphrase) {
        try {
            const { publicKey, signPrivateKey } = accountService.getKeys(passphrase)
            const accountId = getAccountIdFromPublicKey(publicKey)
            const balanceBurst = await accountService.getBalance(accountId)
            if (balanceBurst.less(TokenContract.CreationFee)) {
                throw new Error(`Accounts balance needs at least ${TokenContract.CreationFee.toString()}`)
            }

            let { transaction } = await BurstApi.contract.publishContract({
                codeHex: TokenContract.Bytecode,
                activationAmountPlanck: TokenContract.ActivationCosts.getPlanck(),
                description: JSON.stringify(tokenData),
                name: TokenContract.Name,
                senderPrivateKey: signPrivateKey,
                senderPublicKey: publicKey,
                isCIP20Active: true,
            })

            await inactiveTokensRepository.insert(transaction)
            this._dispatch(Events.Success, "Token successfully generated")
        } catch (e) {
            this._dispatch(Events.Error, e.message)
            throw e
        }
    }
}

export const applicationTokenService = new ApplicationTokenService()
