import { writable } from 'svelte/store'
import { isClientSide } from '../../utils/isClientSide'
import { voidFn } from '../../utils/voidFn'
import { GenericExtensionWallet } from '@signumjs/wallets'
import { Vars } from '../../context'
import { setAccount, clearAccount } from './accountStore'
import { dispatchEvent } from '../../utils/dispatchEvent'
import { Events } from '../../utils/events'
import { ledgerService } from '../../services/ledgerService'

const InitialState = {
    wallet: null,
}

let connectionListener = null

export const xtWallet$ = writable(InitialState, set => {
    if (!isClientSide()) return voidFn

    return () => {
        if (connectionListener) {
            connectionListener.unlisten()
        }
        set(InitialState)
    }
})

function onAccountChanged(args) {
    setAccount(args.accountId)
}

function onAccountRemoved() {
    clearAccount()
}

function onNetworkChanged(args) {
    const expectedNetwork = Vars.IsTestnet ? 'Signum-TESTNET' : 'Signum'
    if (args.networkName !== expectedNetwork) {
        dispatchEvent(Events.Warning, 'Unsupported Network selected')
    } else {
        ledgerService.updateNode(args.networkHost)
    }
}

function onPermissionRemoved() {
    clearAccount()
}

export async function connectXtWallet() {
    try {
        const wallet = new GenericExtensionWallet()
        const connection = await wallet.connect({
            appName: 'The DAppository',
            networkName: Vars.IsTestnet ? 'Signum-TESTNET' : 'Signum',
        })
        ledgerService.updateNode(connection.currentNodeHost)

        connectionListener = connection.listen({
            onAccountChanged,
            onAccountRemoved,
            onNetworkChanged,
            onPermissionRemoved,
        })

        setAccount(connection.accountId)
        xtWallet$.set({ wallet })
        console.debug('XT Wallet connected')
    } catch (e) {
        dispatchEvent(Events.Error, e.message)
    }
}

export function disconnectXtWallet() {
    xtWallet$.update(() => {
        if (connectionListener) {
            connectionListener.unlisten()
            connectionListener = null
        }
        clearAccount()
        return InitialState
    })
}
