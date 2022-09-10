import { writable, readable } from 'svelte/store'
import { SettingsKeys, settingsService } from '../../services/settingsService'
import { isClientSide } from '../../utils/isClientSide'
import { ThemeNames } from '../../utils/themeNames'
import { voidFn } from '../../utils/voidFn'
import { Vars } from '../../context'
import { networkService } from '../../services/networkService'

const PrefersDarkModeQuery = '(prefers-color-scheme: dark)'

export const theme$ = writable(ThemeNames.Default, set => {
    if (!isClientSide()) return voidFn

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
    if (!isClientSide()) return voidFn
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

const BlockPollingInterval = Vars.ContractPollingIntervalSecs

const DefaultBlockchainStatusState = {
    currentBlock: null,
}

export const blockchainStatus$ = readable(DefaultBlockchainStatusState, set => {
    if (!isClientSide()) return voidFn

    async function fetchCurrentBlock() {
        const currentBlock = await networkService.getCurrentBlock()
        set({ currentBlock })
    }

    fetchCurrentBlock()
    const interval = setInterval(fetchCurrentBlock, BlockPollingInterval)
    return () => {
        clearInterval(interval)
        set(DefaultBlockchainStatusState)
    }
})

