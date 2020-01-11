import { applicationTokenRepository } from '../repositories/applicationTokenRepository.js'
import { eventDispatcher } from '../utils/eventDispatcher'
import { BurstApi } from '../utils/burstApi.js'
import { Config } from '../config.js'
import { ApplicationToken } from '../repositories/applicationToken'

export const Events = {
    Start: 'start',
    Progress: 'progress',
    Error: 'error',
    Finish: 'finish',
}

const MaxParallelFetches = 6
const ApplicationTokenName = 'AppRegistry' // TODO: define a nice name

export class ApplicationTokenService extends EventTarget {
    constructor(repository = applicationTokenRepository) {
        super()
        this._repository = repository
        this._dispatch = eventDispatcher(this)
        this._contractApi = BurstApi.contract
    }

    async syncTokens() {
        this._dispatch(Events.Start)
        try {
            const contractIds = await this._fetchContractIds()
            const total = contractIds.length
            this._dispatch(Events.Progress, { total, processed: 0 })
            while (contractIds.length) {
                const chunkedIds = []
                for (let i = 0; i < MaxParallelFetches; ++i) {
                    chunkedIds.push(contractIds.pop())
                }
                const contracts = await this._fetchContractDetailsChunked(chunkedIds)
                const appTokens = contracts
                    .filter(contract => contract.name.startsWith(ApplicationTokenName))
                    .filter(contract => !contract.dead)
                    .map(ApplicationToken.mapFromContract)
                    .filter(token => token && token.isActive)
                await this._repository.upsertBulk(appTokens)
                this._dispatch(Events.Progress, { total, processed: total - contractIds.length })
            }
        } catch (e) {
            this._dispatch(Events.Error, e.message)
        } finally {
            this._dispatch(Events.Finish)
        }
    }

    getCollection() {
        return this._repository.collection
    }

    async getToken(tokenId){
        return await this.getCollection().where('at').equals(tokenId).first()
    }

    async getTokens(filter) {
        return await this._repository.get()
    }

    async _fetchContractIds() {
        const { atIds } = await this._contractApi.getAllContractIds(null)
        const firstContractId = atIds.lastIndexOf(Config.FirstApplicationContractId)
        return atIds.slice(firstContractId - 1)
    }

    async toggleFavorite(id){
        const {favorite} = await this._repository.get(id);
        await this._repository.update(id, {favorite:!favorite})
    }

    _fetchContractDetailsChunked(contractIds) {
        return Promise.all(
            contractIds.map(cid => this._contractApi.getContract(cid)),
        )
    }

}
