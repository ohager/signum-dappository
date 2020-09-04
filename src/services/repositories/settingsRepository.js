import { db } from './database'

const DefaultDatabase = db

export class SettingsRepository {
    constructor(database = DefaultDatabase) {
        this._db = database.settings
    }

    async get(key) {
        return this._db.where('key').equals(key).first()
    }

    async upsert(key, value) {
        await this._db.put({ key, value })
    }

    async remove(key) {
        return await this._db.delete(key)
    }
}

export const settingsRepository = new SettingsRepository()
