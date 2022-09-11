import { unconfirmedTokensRepository } from './repositories/unconfirmedTokensRepository'

export class UnconfirmedTokenService {
    constructor(repository = unconfirmedTokensRepository) {
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

    async prune(confirmedTokenIds) {
        let unconfirmedTokens = await this.getTokens()
        for (const { at } of unconfirmedTokens) {
            if (confirmedTokenIds.includes(at)) {
                await this.removeToken(at)
            }
        }
    }
}

export const unconfirmedTokenService = new UnconfirmedTokenService()
