import { readable, writable } from 'svelte/store'
import { applicationTokenService } from '../services/applicationTokenService'
import { isClientSide } from '../utils/isClientSide'
import { Events } from '../utils/events'
import { Config } from '../config'

const InitialSyncProgressState = 0
const UpdateInterval = Config.ContractPollingIntervalSecs
const InitialTokensState = {
    filter: null,
    items: [],
}

const syncProgress$ = readable(InitialSyncProgressState, (set) => {
    if (!isClientSide()) return
    const service = applicationTokenService
    let updateProgress = ({ detail }) => {
        const { total, processed } = detail
        set(total && processed / total)
    }
    window.addEventListener(Events.Progress, updateProgress)
    service.syncTokens()
    const interval = setInterval(service.syncTokens.bind(service), UpdateInterval)
    return () => {
        clearInterval(interval)
        window.removeEventListener(Events.Progress, updateProgress)
        set(InitialSyncProgressState)
    }
})

const tokens$ = writable(InitialTokensState, (set) => {
    if (!isClientSide()) return
    const service = applicationTokenService
    const updateTokens = () => {
        service.getTokens().then(tokens => {
            tokens$.update(state => ({
                ...state,
                items: tokens,
            }))
        })
    }
    window.addEventListener(Events.Finish, updateTokens)
    updateTokens()
    return () => {
        window.removeEventListener(Events.Finish, updateTokens)
        set(InitialTokensState)
    }
})

const filterTokensBy = filter => {
    // todo apply filter
}

export {
    tokens$,
    syncProgress$,
    filterTokensBy,
}
