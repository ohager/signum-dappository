import { tokenMonitorRepository } from '../repositories/tokenMonitorRepository'
import { TokenStateMonitor } from './TokenStateMonitor'
import { voidFn } from '../utils/voidFn'

const TokenWatcherIntervalSecs = 10
const TokenWatcherTimeoutSecs = 1 * 30

export class TokenMonitorService {
    constructor(repository = tokenMonitorRepository) {
        this._repository = repository
        this._activeMonitors = []
    }

    get activeMonitors() {
        return this._activeMonitors
    }

    async restoreMonitors(callback = voidFn) {
        const monitors = await this._repository.getAll()
        monitors.forEach(monitor => {
            this.restoreMonitor(monitor.at, callback)
        })
        return monitors
    }

    async restoreMonitor(tokenId, callback = voidFn) {
        const { expected, startTime } = await this._repository.get(tokenId)
        const fieldName = Object.keys(expected)[0]
        const expectedValue = expected[fieldName]

        await this.startMonitor({
            tokenId,
            fieldName,
            expectedValue,
            callback,
            startTime,
        })
    }

    async startMonitor({ tokenId, fieldName, expectedValue, callback = voidFn, startTime = Date.now() }) {
        const activeMonitor = this.activeMonitors.includes(tokenId)
        if (activeMonitor) {
            console.debug(`Monitor [${tokenId}] already active - ignored`)
            return Promise.resolve()
        }

        const monitor = new TokenStateMonitor({
            tokenId,
            abortAfterSecs: TokenWatcherTimeoutSecs,
            intervalSecs: TokenWatcherIntervalSecs,
        })

        monitor.watch({
            predicateFn: (token) => token[fieldName] === expectedValue,
            callback: async (m, fulfilled) => {
                await this.removeMonitor(tokenId)
                callback(m, fulfilled)
            },
        })

        await this._repository.insert({
            at: tokenId,
            expected: {
                [fieldName]: expectedValue,
            },
            startTime,
        })

        this._activeMonitors.push(tokenId)

    }

    async removeMonitor(tokenId) {
        await this._repository.remove(tokenId)
        this._activeMonitors = this._activeMonitors.filter(id => id !== tokenId)
    }
}

export const tokenMonitorService = new TokenMonitorService()
