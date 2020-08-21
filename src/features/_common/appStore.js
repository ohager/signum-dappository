import { writable } from 'svelte/store'
import { isClientSide } from '../../utils/isClientSide'

export const loading$ = writable(false, (set) => {
    if (!isClientSide()) return

    return () => {
        set(false)
    }
})

export function startLoading() {
    loading$.update(_ => true )
}

export function finishLoading() {
    loading$.update(_ => false )
}
