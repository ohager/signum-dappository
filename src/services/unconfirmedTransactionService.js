import { dispatchEvent } from '../utils/dispatchEvent'
import { unconfirmedTransactionsRepository } from '../repositories/unconfirmedTransactionsRepository'
import { BurstApi } from '../utils/burstApi'

export class UnconfirmedTransactionService {
    constructor(repository = unconfirmedTransactionsRepository) {
        this._dispatch = dispatchEvent
        this._repository = repository
    }

    async syncUnconfirmedTransactions() {
        const { unconfirmedTransactions } = await BurstApi.transaction.getUnconfirmedTransactions()
        await this._repository.clear()
        await this._repository.upsertBulk(unconfirmedTransactions)
    }

    async getUnconfirmedTransactions() {
        return this._repository.get()
    }
}

export const unconfirmedTransactionService = new UnconfirmedTransactionService()
