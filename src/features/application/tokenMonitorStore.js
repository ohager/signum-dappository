import { readable } from 'svelte/store'
import { isClientSide } from '../../utils/isClientSide'
import { dispatchEvent } from '../../utils/dispatchEvent'
import { Events } from '../../utils/events'
import { Config } from '../../config'
import { tokenMonitorService } from '../../services/tokenMonitorService'

const InitialState = []
export const activeTokenMonitors$ = readable(InitialState, (set) => {
    if (!isClientSide()) return

    tokenMonitorService
        .restoreMonitors((monitor, fulfilled) => {
            if(!fulfilled){
                dispatchEvent(Events.Warning, `Action for token [${monitor.at}] timed out - Please retry`)
            }
            set(tokenMonitorService.activeMonitors)
        })
        .then(activeMonitors => {
            console.debug('activeMonitors', activeMonitors)
            set(activeMonitors)
        },
    )

    return () => {
        set(InitialState)
    }
})
