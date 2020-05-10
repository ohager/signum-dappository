import { readable, writable } from 'svelte/store'
import { applicationTokenService } from '../services/applicationTokenService'
import { isClientSide } from '../utils/isClientSide'
import { Events } from '../utils/events'
import { Config } from '../config'

const InitialAccountState = {
    accountId: '',
}

const account$ = writable(InitialAccountState, (set) => {
    if (!isClientSide()) return

    // fetch the account in index db

    return () => {
        set(InitialAccountState)
    }
})

function setAccount(accountId) {
    account$.update(state => {
        return {
            ...state,
            accountId
        }
    })
}

function clearAccount() {
    account$.update( state => InitialAccountState )
}

export {
    account$,
    setAccount,
    clearAccount
}
