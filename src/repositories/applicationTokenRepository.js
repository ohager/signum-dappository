import {db} from './database'

const DefaultDatabase = db

export class ApplicationTokenRepository {
    constructor(db = DefaultDatabase) {
        this._db = db.appTokens;
    }

    get collection() {
        return this._db;
    }

    async upsert(token){
        await this._db.put(token)
    }

    async upsertBulk(tokens){
        await this._db.bulkPut(tokens)
    }

    async get(filter, order){
        // TODO: apply filter
        return await this._db.orderBy(order).toArray()
        // return await this._db.
    }

    async update(id, data){
        return await this._db.update(id, data)
    }
}

export const applicationTokenRepository = new ApplicationTokenRepository()
