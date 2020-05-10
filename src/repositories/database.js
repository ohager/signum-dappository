import Dexie from 'dexie'
import { ApplicationToken } from './models/applicationToken'
import { InactiveTokens } from './models/inactiveTokens'
import { Settings } from './models/settings'

const database = new Dexie('app-store')

const Version = 1

const Schema = {
    appTokens: ApplicationToken.schema(),
    inactiveTokens: InactiveTokens.schema(),
    settings: Settings.schema(),
}

database.version(Version).stores(Schema)
database.appTokens.mapToClass(ApplicationToken)
database.inactiveTokens.mapToClass(InactiveTokens)
database.settings.mapToClass(Settings)

export const db = database
