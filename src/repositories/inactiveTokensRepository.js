import { db } from './database'

const DefaultDatabase = db

export class InactiveTokensRepository {
    constructor(db = DefaultDatabase) {
        this._db = db.inactiveTokens
    }

    async get(){
        return this._db.toArray()
    }

    async insert(at) {
        await this._db.put({ at })
    }

    async remove(at) {
        return await this._db.delete(at)
    }
}

export const inactiveTokensRepository = new InactiveTokensRepository()
