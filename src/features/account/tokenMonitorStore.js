import { writable } from 'svelte/store'
import { isClientSide } from '../../utils/isClientSide'
import { dispatchEvent } from '../../utils/dispatchEvent'
import { Config } from '../../config'
import { tokenMonitorService } from '../../services/tokenMonitorService'

const InitialState = []
export const activeTokenMonitors$ = writable(InitialState, (set) => {
    if(!isClientSide()) return

    tokenMonitorService.restoreMonitors().then(() => {
        set(tokenMonitorService.activeMonitors)
    })
    return  () => {
        set(InitialState)
    }
})

export function updateActiveTokens(tokenIds){
    activeTokenMonitors$.set(tokenIds)
}
