import { dispatchEvent } from '../utils/dispatchEvent'
import { BurstApi } from '../utils/burstApi.js'
import { BurstValue } from '@burstjs/util'
import { generateMasterKeys, getAccountIdFromPublicKey } from '@burstjs/crypto'
import { TokenContract } from './tokenContract'
import { inactiveTokensRepository } from '../repositories/inactiveTokensRepository'

export class InactiveTokenService {
    constructor(repository = inactiveTokensRepository) {
        this._dispatch = dispatchEvent
        this._repository = repository
    }

    async getTokens() {
        return this._repository.get()
    }

    async addToken(at) {
        await this._repository.insert(at)
    }

    async removeToken(at) {
        await this._repository.remove(at)
    }

    async activateToken() {
        // TODO: like donation - use deep link - not sure if this is worth a mehtod
    }
}

export const inactiveTokenService = new InactiveTokenService()
