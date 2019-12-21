import Dexie from 'dexie'
import { ApplicationToken } from './applicationToken'
import { Favorite } from './favorite'

const database = new Dexie('app-store')

const Version = 1

const Schema = {
    appTokens: ApplicationToken.schema(),
    favorites: Favorite.schema()
}

database.version(Version).stores(Schema)
database.appTokens.mapToClass(ApplicationToken)
database.appTokens.mapToClass(Favorite)

export const db = database
