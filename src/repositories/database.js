import Dexie from 'dexie'
import { ApplicationToken } from './models/applicationToken'
import { UnconfirmedTokens } from './models/unconfirmedTokens'
import { Settings } from './models/settings'
import { UnconfirmedTransactions } from './models/unconfirmedTransactions'

const database = new Dexie('app-store')

const Version = 1

const Schema = {
    appTokens: ApplicationToken.schema(),
    unconfirmedTokens: UnconfirmedTokens.schema(),
    settings: Settings.schema(),
    unconfirmedTransactions: UnconfirmedTransactions.schema(),
}

database.version(Version).stores(Schema)
database.appTokens.mapToClass(ApplicationToken)
database.unconfirmedTokens.mapToClass(UnconfirmedTokens)
database.settings.mapToClass(Settings)
database.unconfirmedTransactions.mapToClass(UnconfirmedTransactions)

export const db = database
