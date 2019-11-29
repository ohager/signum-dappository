import { writable } from 'svelte/store'
import { ApplicationTokenService, Events } from '../services/applicationTokenService'
import { isClientSide } from '../utils/isClientSide'
// when start loading, need to use indexdb as storage cache

const InitialState = {
    filter: null,
    apps: [],
    syncProgress: 0,
}

const store = writable(InitialState, (set) => {

    if (!isClientSide()) return

    const service = new ApplicationTokenService()
    service.addEventListener(Events.Progress, ({detail}) => {
        const { total, processed } = detail
        console.log(total, processed)
        store.update(state => ({
            ...state,
            syncProgress: total && processed / total,
        }))
    })
    service.syncTokens()

    return () => {
        service.removeEventListener()
        set(InitialState)
    }
})

const filterBy = (filter) => {
    // todo apply filter
    store.update((state) => ({
            filter, apps,
        }),
    )
}

export {
    store,
    filterBy,
}
