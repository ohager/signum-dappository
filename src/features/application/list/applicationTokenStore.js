import { readable, writable, get } from 'svelte/store'
import { applicationTokenService } from '../../../services/applicationTokenService'
import { isClientSide } from '../../../utils/isClientSide'
import { Events } from '../../../utils/events'
import { Config } from '../../../config'

const InitialSyncProgressState = 0
const UpdateInterval = Config.ContractPollingIntervalSecs
const InitialTokensState = {
    items: [],
    unconfirmedItems: [],
}

const syncProgress$ = readable(InitialSyncProgressState, (set) => {
    const currentProgress = get(syncProgress$)
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

    window.addEventListener(Events.Progress, updateTokens)
    updateTokens()

    return () => {
        window.removeEventListener(Events.Progress, updateTokens)
        set(InitialTokensState)
    }
})
//
//
// const unconfirmedTokens$ = writable(InitialTokensState, (set) => {
//     if (!isClientSide()) return
//
//     const service =
//     const updateTokens = (progress) => {
//         unconfirmedTokenService..then(tokens => {
//             tokens$.update(state => ({
//                 ...state,
//                 items: tokens,
//             }))
//         })
//     }
//
//     window.addEventListener(Events.Progress, updateTokens)
//     updateTokens()
//
//     return () => {
//         window.removeEventListener(Events.Progress, updateTokens)
//         set(InitialTokensState)
//     }
// })
//

export {
    tokens$,
    // unconfirmedTokens$,
    syncProgress$,
}
