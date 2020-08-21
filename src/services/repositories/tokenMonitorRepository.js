import { db } from './database'

const DefaultDatabase = db

export class TokenMonitorRepository {
    constructor(db = DefaultDatabase) {
        this._db = db.tokenMonitors
    }

    async getAll(){
        return this._db.toArray()
    }

    async get(at){
        return this._db.get(at)
    }

    async insert(data) {
        await this._db.put(data)
    }

    async remove(at) {
        return await this._db.delete(at)
    }
}

export const tokenMonitorRepository = new TokenMonitorRepository()
