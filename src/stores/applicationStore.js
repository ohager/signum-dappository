import { readable, writable } from 'svelte/store'
import { ApplicationTokenService, Events } from '../services/applicationTokenService'
import { isClientSide } from '../utils/isClientSide'

const InitialSyncProgressState = 0
const UpdateInterval = 60 * 1000
const InitialTokensState = {
    filter: null,
    items: [],
}

const syncProgress$ = readable(InitialSyncProgressState, (set) => {
    if (!isClientSide()) return
    const service = new ApplicationTokenService()
    service.addEventListener(Events.Progress, ({ detail }) => {
        const { total, processed } = detail
        set(total && processed / total)
    })
    service.syncTokens()
    const interval = setInterval(service.syncTokens, 60*1000)

    return () => {
        clearInterval(interval)
        service.removeEventListener()
        set(InitialSyncProgressState)
    }
})

const tokens$ = writable(InitialTokensState, (set) => {
    if (!isClientSide()) return
    const service = new ApplicationTokenService()
    service.getTokens().then(tokens => {
        tokens$.update(state => ({
            ...state,
            items: tokens,
        }))
    })

    return () => {
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
