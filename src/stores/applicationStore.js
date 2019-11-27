import { writable } from 'svelte/store'
import { httpClientProvider } from '../utils/httpClientProvider'
// when start loading, need to use indexdb as storage cache

const InitialState = {
    filter: null,
    apps: [],
}

const store = writable(InitialState, (set) => {
    // todo: use a service for caching stuff
    const client = httpClientProvider.get()
    client.get('/apps')
        .then(({ response }) => {
            set({ ...InitialState, apps: response.result })
        })
        .catch(console.error)
    return () => {
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
