import { tokenMonitorRepository } from './repositories/tokenMonitorRepository'
import { TokenStateMonitor } from './TokenStateMonitor'
import { dispatchEvent } from '../utils/dispatchEvent'
import { Events } from '../utils/events'
import { updateActiveTokens } from '../features/account/tokenMonitorStore'
import { applicationTokenRepository } from './repositories/applicationTokenRepository'
import { Vars } from '../context'

export class TokenMonitorService {
    constructor(
        monitorRepository = tokenMonitorRepository,
        tokenRepository = applicationTokenRepository,
    ) {
        this._dispatch = dispatchEvent
        this._monitorRepository = monitorRepository
        this._tokenRepository = tokenRepository
        this._activeMonitors = []
    }

    get activeMonitors() {
        return this._activeMonitors
    }

    async restoreMonitors() {
        const monitors = await this._monitorRepository.getAll()
        monitors.forEach(monitor => {
            this.restoreMonitor(monitor.at)
        })
    }

    async restoreMonitor(tokenId) {
        const { expected, startTime } = await this._monitorRepository.get(tokenId)
        const fieldName = Object.keys(expected)[0]
        const expectedValue = expected[fieldName]
        const expired = (Date.now() - startTime) / 1000 > Vars.TokenWatcherTimeoutSecs
        if (expired) {
            console.debug('Expired Monitor', tokenId)
            return this.removeMonitor(tokenId)
        }
        await this.startMonitor({
            tokenId,
            fieldName,
            expectedValue,
            startTime,
        })
    }

    async startMonitor({ tokenId, fieldName, expectedValue, startTime = Date.now() }) {
        const activeMonitor = this.activeMonitors.includes(tokenId)
        if (activeMonitor) {
            console.debug(`Monitor [${tokenId}] already active - ignored`)
            return Promise.resolve()
        }
        const monitor = new TokenStateMonitor({
            tokenId,
            abortAfterSecs: Vars.TokenWatcherTimeoutSecs,
            intervalSecs: Vars.TokenWatcherIntervalSecs,
        })
        monitor.start({
            predicateFn: token => token[fieldName] === expectedValue,
            callback: async (tokenData, fulfilled) => {
                await this.removeMonitor(tokenData.at)
                if (!fulfilled) {
                    this._dispatch(
                        Events.Warning,
                        `Action for token [${tokenData.at}] timed out - Please retry`,
                    )
                } else {
                    await this._updateLocalToken(tokenData)
                }
            },
            startTime,
        })

        await this._monitorRepository.insert({
            at: tokenId,
            expected: {
                [fieldName]: expectedValue,
            },
            startTime,
        })

        this._activeMonitors.push(tokenId)
        updateActiveTokens(this.activeMonitors)
    }

    async removeMonitor(tokenId) {
        await this._monitorRepository.remove(tokenId)
        this._activeMonitors = this._activeMonitors.filter(id => id !== tokenId)
        updateActiveTokens(this.activeMonitors)
    }

    async _updateLocalToken(tokenData) {
        await this._tokenRepository.update(tokenData.at, tokenData)
        this._dispatch(Events.Progress, { total: 1, processed: 1 })
    }
}

export const tokenMonitorService = new TokenMonitorService()
