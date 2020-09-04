import { writable } from 'svelte/store'
import { isClientSide } from '../../utils/isClientSide'
import { SettingsKeys, settingsService } from '../../services/settingsService'
import { voidFn } from '../../utils/voidFn'

const InitialAccountState = {
    accountId: '',
}

const account$ = writable(InitialAccountState, set => {
    if (!isClientSide()) return voidFn

    settingsService.getValue(SettingsKeys.CurrentAccount).then(accountId => {
        if (accountId) {
            set({ accountId })
        }
    })

    return () => {
        set(InitialAccountState)
    }
})

function setAccount(accountId) {
    settingsService.updateValue(SettingsKeys.CurrentAccount, accountId)
    account$.update(state => {
        return {
            ...state,
            accountId,
        }
    })
}

function clearAccount() {
    settingsService.removeValue(SettingsKeys.CurrentAccount)
    account$.update(() => InitialAccountState)
}

export { account$, setAccount, clearAccount }
