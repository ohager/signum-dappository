import { db } from './database'

const DefaultDatabase = db

export class UnconfirmedTransactionsRepository {
    constructor(db = DefaultDatabase) {
        this._db = db.unconfirmedTransactions
    }

    async clear() {
        await this._db.clear()
    }

    async get(){
        return this._db.toArray()
    }

    async insert(utx) {
        await this._db.put(utx)
    }

    async upsertBulk(utxList){
        await this._db.bulkPut(utxList)
    }

    async remove(utxid) {
        return await this._db.delete(utxid)
    }
}

export const unconfirmedTransactionsRepository = new UnconfirmedTransactionsRepository()
