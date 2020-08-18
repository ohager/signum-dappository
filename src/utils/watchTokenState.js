import { TokenStateMonitor } from './TokenStateMonitor'

const TokenWatcherIntervalSecs = 10
const TokenWatcherTimeoutSecs = 8 * 60

export function watchTokenState({ tokenId, predicateFn, callback}){
    const monitor = new TokenStateMonitor({
        tokenId,
        abortAfterSecs: TokenWatcherTimeoutSecs,
        intervalSecs: TokenWatcherIntervalSecs
    })
    monitor.watch({predicateFn, callback})
}
