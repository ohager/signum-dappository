import Dexie from 'dexie'
import { ApplicationToken } from './models/applicationToken'
import { UnconfirmedTokens } from './models/unconfirmedTokens'
import { Settings } from './models/settings'

const database = new Dexie('app-store')

const Version = 1

const Schema = {
    appTokens: ApplicationToken.schema(),
    unconfirmedTokens: UnconfirmedTokens.schema(),
    settings: Settings.schema(),
}

database.version(Version).stores(Schema)
database.appTokens.mapToClass(ApplicationToken)
database.unconfirmedTokens.mapToClass(UnconfirmedTokens)
database.settings.mapToClass(Settings)

export const db = database
