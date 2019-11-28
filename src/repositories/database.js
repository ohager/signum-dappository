import Dexie from 'dexie'

const database = new Dexie('app-store')

const Version = 1

const Schema = {
    appTokens: 'contractId, owner, created, name, description, tags, active, donation, donationCount',
}

database.version(Version).stores(Schema)

export const db = database
