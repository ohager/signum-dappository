import { writable } from 'svelte/store'
import { isClientSide } from '../../utils/isClientSide'
import { tokenMonitorService } from '../../services/tokenMonitorService'
import { voidFn } from '../../utils/voidFn'

const InitialState = []
export const activeTokenMonitors$ = writable(InitialState, set => {
    if (!isClientSide()) return voidFn

    tokenMonitorService.restoreMonitors().then(() => {
        set(tokenMonitorService.activeMonitors)
    })
    return () => {
        set(InitialState)
    }
})

export function updateActiveTokens(tokenIds) {
    activeTokenMonitors$.set(tokenIds)
}
