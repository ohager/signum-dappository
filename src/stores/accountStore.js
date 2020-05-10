import { writable } from 'svelte/store'
import { isClientSide } from '../utils/isClientSide'
import { SettingsKeys, settingsService } from '../services/settingsService'

const InitialAccountState = {
    accountId: '',
}

const account$ = writable(InitialAccountState, (set) => {
    if (!isClientSide()) return

    // fetch the account in index db
    settingsService.getValue(SettingsKeys.CurrentAccount).then(accountId => {
        if(accountId){
            set({ accountId })
        }
    }).catch(e => {
        console.log('not found')
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
    account$.update(state => InitialAccountState)
}

export {
    account$,
    setAccount,
    clearAccount,
}
