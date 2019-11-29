import { applicationTokenRepository } from '../repositories/applicationTokenRepository.js'
import { eventDispatcher } from '../utils/eventDispatcher'
import { BurstApi } from '../utils/burstApi.js'
import { ApplicationToken } from '../repositories/applicationToken'

export const Events = {
    Start: 'start',
    Progress: 'progress',
    Error: 'error',
    Finish: 'finish',
}

const FirstAppTokenContractId = '17408006744691164004'
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
                let chunkedIds = []
                for (let i = 0; i < MaxParallelFetches; ++i) {
                    chunkedIds.push(contractIds.pop())
                }
                const contracts = await this._fetchContractDetailsChunked(chunkedIds)
                const appTokens = contracts
                    .filter( c => c.name.startsWith(ApplicationTokenName))
                    .filter( t => !t.dead)
                    .map(ApplicationToken.mapFromContract)
                console.log('bla', appTokens)
                this._repository.upsertBulk(appTokens)

                this._dispatch(Events.Progress, { total, processed: total - contractIds.length })
            }

            console.log(response)
        } catch (e) {
            this._dispatch(Events.Error, e.message)
        } finally {
            this._dispatch(Events.Finish)
        }
    }

    async _fetchContractIds() {
        const { atIds } = await this._contractApi.getAllContractIds(null)
        const firstContractId = atIds.lastIndexOf(FirstAppTokenContractId)
        return atIds.slice(firstContractId - 1)
    }

    _fetchContractDetailsChunked(contractIds) {
        return Promise.all(
            contractIds.map(cid => this._contractApi.getContract(cid)),
        )
    }
}
