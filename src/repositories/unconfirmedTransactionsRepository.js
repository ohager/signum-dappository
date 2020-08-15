import { db } from './database'

const DefaultDatabase = db

export class UnconfirmedTransactionsRepository {
    constructor(db = DefaultDatabase) {
        this._db = db.unconfirmedTransactions
    }

    async get(){
        return this._db.toArray()
    }

    async insert(utx) {
        await this._db.put(utx)
    }

    async remove(txid) {
        return await this._db.delete(id)
    }
}

export const unconfirmedTransactionsRepository = new UnconfirmedTransactionsRepository()
