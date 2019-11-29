import {db} from './database'

const DefaultDatabase = db

export class ApplicationTokenRepository {
    constructor(db = DefaultDatabase) {
        this._db = db;
    }

    upsert(token){
        this._db.appTokens.put(token)
    }

    upsertBulk(tokens){
        this._db.appTokens.bulkPut(tokens)
    }
}

export const applicationTokenRepository = new ApplicationTokenRepository()
