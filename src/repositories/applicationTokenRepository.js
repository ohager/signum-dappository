import {db} from './database'

const DefaultDatabase = db

export class ApplicationTokenRepository {
    constructor(db = DefaultDatabase) {
        this._db = db.appTokens;
    }

    async upsert(token){
        await this._db.put(token)
    }

    async upsertBulk(tokens){
        await this._db.bulkPut(tokens)
    }

    async get(filter, order){
        // TODO: apply filter
        return this._db.orderBy(order).toArray()
        // return await this._db.
    }
}

export const applicationTokenRepository = new ApplicationTokenRepository()
