import { writable } from 'svelte/store'
import { applicationTokenService } from '../../services/applicationTokenService'
import { isClientSide } from '../../utils/isClientSide'
import { Events } from '../../utils/events'

const InitialTokensState = {
    items: [],
    unconfirmedItems: [],
}

export const tokens$ = writable(InitialTokensState, (set) => {
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

