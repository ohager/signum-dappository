import { dispatchEvent } from '../utils/dispatchEvent'
import { settingsRepository } from '../repositories/settingsRepository'

export const SettingsKeys = {
    CurrentAccount: 'current-account',
}

export class SettingsService {
    constructor(repository = settingsRepository) {
        this._dispatch = dispatchEvent
        this._repository = settingsRepository
    }

    async getValue(key) {
        const result = await this._repository.get(key)
        return result && result.value
    }

    async removeValue(key) {
        return await this._repository.remove(key)
    }

    async updateValue(key, value) {
        return await this._repository.upsert(key, value)
    }

}

export const settingsService = new SettingsService()
