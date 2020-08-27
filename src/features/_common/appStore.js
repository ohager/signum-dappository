import { writable } from 'svelte/store'
import { SettingsKeys, settingsService } from '../../services/settingsService'
import { isClientSide } from '../../utils/isClientSide'
import { ThemeNames } from '../../utils/themeNames'

export const theme$ = writable(ThemeNames.Default, set => {
    if(!isClientSide()) return
    set(settingsService.getValue(SettingsKeys.Theme))
})

export function setTheme(themeName) {
    theme$.update(_ => {
        settingsService.updateValue(SettingsKeys.Theme, themeName)
        return themeName
    })
}

export const loading$ = writable(false, (set) => {
    return () => {
        set(false)
    }
})

export function startLoading() {
    loading$.update(_ => true)
}

export function finishLoading() {
    loading$.update(_ => false)
}
