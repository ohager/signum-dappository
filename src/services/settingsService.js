import { settingsRepository } from './repositories/settingsRepository'

export const SettingsKeys = {
    CurrentAccount: 'current-account',
    Theme:'theme'
}

export class SettingsService {
    constructor(repository = settingsRepository) {
        this._repository = repository
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
