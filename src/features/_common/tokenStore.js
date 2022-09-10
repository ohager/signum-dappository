import { writable } from 'svelte/store'
import { applicationTokenService } from '../../services/applicationTokenService'
import { unconfirmedTokenService } from '../../services/unconfirmedTokenService'
import { Events } from '../../utils/events'
import { voidFn } from '../../utils/voidFn'
import { isClientSide } from '../../utils/isClientSide'

const InitialTokensState = {
    items: [],
    unconfirmedItems: [],
}

export const tokens$ = writable(InitialTokensState, set => {
    if (!isClientSide()) return voidFn
    const updateTokens = async () => {
        const confirmedTokens = await applicationTokenService.getTokens()
        const confirmedTokenIds = confirmedTokens.map(({ at }) => at)
        await unconfirmedTokenService.prune(confirmedTokenIds)
        const unconfirmedTokens = await unconfirmedTokenService.getTokens()


        tokens$.update(state => ({
            ...state,
            items: confirmedTokens,
            unconfirmedItems: unconfirmedTokens,
        }))
    }

    window.addEventListener(Events.Progress, updateTokens)

    updateTokens()

    return () => {
        window.removeEventListener(Events.Progress, updateTokens)
        set(InitialTokensState)
    }
})
