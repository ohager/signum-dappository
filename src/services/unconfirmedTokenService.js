import { dispatchEvent } from '../utils/dispatchEvent'
import { BurstApi } from '../utils/burstApi.js'
import { unconfirmedTokensRepository } from '../repositories/unconfirmedTokensRepository'

export class UnconfirmedTokenService {
    constructor(repository = unconfirmedTokensRepository) {
        this._dispatch = dispatchEvent
        this._repository = repository
    }

    async getTokenIds() {
        return this._repository.get()
    }

    async fetchTokens() {
        const tokenIds = await this.getTokenIds()
        return await Promise.all(tokenIds.map( ({at}) => BurstApi.contract.getContract(at) ))
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

export const unconfirmedTokenService = new UnconfirmedTokenService()
