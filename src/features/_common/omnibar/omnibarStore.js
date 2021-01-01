import { writable } from 'svelte/store'
import { OmnibarViewMode } from './OmnibarViewMode'
import { isClientSide } from '../../../utils/isClientSide'
import { voidFn } from '../../../utils/voidFn'
import { SettingsKeys, settingsService } from '../../../services/settingsService'

const DefaultOptions = {
    text: '',
    options: {
        expanded: true,
        newestFirst: false,
        orderByScore: true,
        orderAlphabetically: false,
        viewMode: OmnibarViewMode.Cards,
    },
}

export const omnibarStore$ = writable(DefaultOptions, set => {
    if (!isClientSide()) return voidFn

    settingsService.getValue(SettingsKeys.Omnibar).then( options => {
        set(options || DefaultOptions)
    })

    return () => {
        set(DefaultOptions)
    }
})

function setField(obj) {
    if (!isClientSide()) return voidFn

    omnibarStore$.update(state => {
        const newState = {
            ...state,
            ...obj,
        }
        settingsService.updateValue(SettingsKeys.Omnibar, newState)
        return newState
    })
}

export function setOptions(options) {
    setField({ options })
}

export function setText(text) {
    setField({ text })
}
