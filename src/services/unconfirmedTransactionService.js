import { dispatchEvent } from '../utils/dispatchEvent'
import { unconfirmedTokensRepository } from '../repositories/unconfirmedTokensRepository'

export class UnconfirmedTransactionService {
    constructor(repository = unconfirmedTransactionsRepository) {
        this._dispatch = dispatchEvent
        this._repository = repository
    }

    async getTokens() {
        return this._repository.get()
    }

    async addTransaction(txid) {
        await this._repository.insert(txid)
    }

    async removeTransaction(txid) {
        await this._repository.remove(txid)
    }

    async prune(unconfirmedTransactions) {
        let unconfirmedTokens = await this.getTokens()
        for (const { at } of unconfirmedTokens) {
            if(confirmedTokenIds.includes(at)){
                await this.removeToken(at)
            }
        }
    }
}

export const unconfirmedTransactionService = new UnconfirmedTransactionService()
