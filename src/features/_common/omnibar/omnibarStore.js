import { writable } from 'svelte/store'
import { OmnibarViewMode } from './OmnibarViewMode'
import { isClientSide } from '../../../utils/isClientSide'
import { voidFn } from '../../../utils/voidFn'

const DefaultOptions = {
    text: '',
    options: {
        newestFirst: false,
        orderByScore: false,
        orderAlphabetically: false,
        viewMode: OmnibarViewMode.Cards,
    },
}

export const omnibarStore$ = writable(DefaultOptions, set => {
    if (!isClientSide()) return voidFn

    // TODO: load settings eventually

    return () => {
        set(DefaultOptions)
    }
})

function setField(obj) {
    if (!isClientSide()) return voidFn

    omnibarStore$.update(state => {
        // TODO: persist data if needed
        // settingsService.updateValue(SettingsKeys.Theme, themeName)
        return {
            ...state,
            ...obj,
        }
    })
}

export function setViewMode(viewMode) {
    setField({ viewMode })
}

export function setFilter(filter) {
    setField({ filter })
}

export function setText(text) {
    setField({ text })
}
