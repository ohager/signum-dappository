import { writable } from 'svelte/store'
import { SettingsKeys, settingsService } from '../../services/settingsService'
import { isClientSide } from '../../utils/isClientSide'
import { ThemeNames } from '../../utils/themeNames'

const PrefersDarkModeQuery = '(prefers-color-scheme: dark)'

export const theme$ = writable(ThemeNames.Default, set => {
    if (!isClientSide()) return

    const getSystemThemeMode = () =>
        window.matchMedia(PrefersDarkModeQuery).matches ? ThemeNames.Dark : ThemeNames.Default

    settingsService.getValue(SettingsKeys.Theme).then(theme => {
        if (theme) {
            set(theme)
        } else {
            set(getSystemThemeMode())
        }
    })
    window.matchMedia(PrefersDarkModeQuery).addListener(e => {
        set(getSystemThemeMode())
    })

    return () => {
        set(ThemeNames.Default)
    }
})

export function setTheme(themeName) {
    if (!isClientSide()) return
    theme$.update(_ => {
        settingsService.updateValue(SettingsKeys.Theme, themeName)
        return themeName
    })
}

export const loading$ = writable(false, set => {
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
