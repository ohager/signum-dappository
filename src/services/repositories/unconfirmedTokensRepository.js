import { db } from './database'

const DefaultDatabase = db

export class UnconfirmedTokensRepository {
    constructor(database = DefaultDatabase) {
        this._db = database.unconfirmedTokens
    }

    async get() {
        return this._db.toArray()
    }

    async insert(tokenData) {
        await this._db.put(tokenData)
    }

    async remove(at) {
        return this._db.delete(at)
    }
}

export const unconfirmedTokensRepository = new UnconfirmedTokensRepository()
