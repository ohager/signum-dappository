import { readable, writable, get } from 'svelte/store'
import { applicationTokenService } from '../services/applicationTokenService'
import { isClientSide } from '../utils/isClientSide'
import { Events } from '../utils/events'
import { Config } from '../config'

const InitialSyncProgressState = 0
const UpdateInterval = Config.ContractPollingIntervalSecs
const InitialTokensState = {
    items: [],
    isFirstSync: true,
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
    const updateTokens = (progress) => {
        service.getTokens().then(tokens => {
            tokens$.update(state => ({
                ...state,
                items: tokens,
            }))
        })
    }

    const updateSyncState = () => {
        tokens$.update(state => ({
            ...state,
            isFirstSync: false,
        }))
    }

    window.addEventListener(Events.Progress, updateTokens)
    window.addEventListener(Events.Finish, updateSyncState)
    updateTokens()

    return () => {
        window.removeEventListener(Events.Progress, updateTokens)
        window.removeEventListener(Events.Finish, updateSyncState)
        set(InitialTokensState)
    }
})

export {
    tokens$,
    syncProgress$,
}
