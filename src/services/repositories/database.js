import Dexie from 'dexie'
import { ApplicationToken } from './models/applicationToken'
import { UnconfirmedTokens } from './models/unconfirmedTokens'
import { Settings } from './models/settings'
import { TokenMonitor } from './models/tokenMonitor'

const database = new Dexie('dappository-store')

const Version = 1

const Schema = {
    appTokens: ApplicationToken.schema(),
    unconfirmedTokens: UnconfirmedTokens.schema(),
    settings: Settings.schema(),
    tokenMonitors: TokenMonitor.schema(),
}

database.version(Version).stores(Schema)
database.appTokens.mapToClass(ApplicationToken)
database.unconfirmedTokens.mapToClass(UnconfirmedTokens)
database.settings.mapToClass(Settings)
database.tokenMonitors.mapToClass(TokenMonitor)

export const db = database
