import { readable } from 'svelte/store'
import { applicationTokenService } from '../../services/applicationTokenService'
import { isClientSide } from '../../utils/isClientSide'
import { Events } from '../../utils/events'
import { Vars } from '../../context'
import { voidFn } from '../../utils/voidFn'

const InitialSyncProgressState = 0
const UpdateInterval = Vars.ContractPollingIntervalSecs

export const syncProgress$ = readable(InitialSyncProgressState, set => {
    if (!isClientSide()) return voidFn

    const service = applicationTokenService
    let updateProgress = ({ detail }) => {
        const { total, processed } = detail
        set(total && processed / total)
    }
    window.addEventListener(Events.Progress, updateProgress, { passive: true })
    service.syncTokens()
    const interval = setInterval(service.syncTokens.bind(service), UpdateInterval)
    return () => {
        clearInterval(interval)
        window.removeEventListener(Events.Progress, updateProgress)
        set(InitialSyncProgressState)
    }
})
