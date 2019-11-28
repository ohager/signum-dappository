import {db} from './database'

const DefaultDatabase = db

export class ApplicationTokenRepository {
    constructor(db = DefaultDatabase) {
        this._db = db;
    }
}

export const applicationTokenRepository = new ApplicationTokenRepository()
