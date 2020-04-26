import Dexie from 'dexie'
import { ApplicationToken } from './applicationToken'
import { InactiveTokens } from './inactiveTokens'

const database = new Dexie('app-store')

const Version = 1

const Schema = {
    appTokens: ApplicationToken.schema(),
    inactiveTokens: InactiveTokens.schema(),
}

database.version(Version).stores(Schema)
database.appTokens.mapToClass(ApplicationToken)
database.inactiveTokens.mapToClass(InactiveTokens)

export const db = database
