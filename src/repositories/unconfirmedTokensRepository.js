import { db } from './database'

const DefaultDatabase = db

export class UnconfirmedTokensRepository {
    constructor(db = DefaultDatabase) {
        this._db = db.unconfirmedTokens
    }

    async get(){
        return this._db.toArray()
    }

    async insert(tokenData) {
        await this._db.put(tokenData)
    }

    async remove(at) {
        return await this._db.delete(at)
    }
}

export const unconfirmedTokensRepository = new UnconfirmedTokensRepository()
