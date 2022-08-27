import { readable, writable } from 'svelte/store'
import { isClientSide } from '../../utils/isClientSide'
import { voidFn } from '../../utils/voidFn'
import { GenericExtensionWallet } from '@signumjs/wallets'
import { Vars } from '../../context'

const InitialState = {
    wallet: null,
}

let connectionListener = null

export const xtWalletStore$ = writable(InitialState, set => {
    if (!isClientSide()) return voidFn

    return () => {
        if (connectionListener) {
            connectionListener.unlisten()
        }
        set(InitialState)
    }
})

function onAccountChanged(args) {
    console.log('On account changed', args)
}

function onAccountRemoved(args) {
    console.log('On account removed', args)
}
function onNetworkChanged(args) {
    console.log('On network changed', args)
}
function onPermissionRemoved(args) {
    console.log('On permission removed', args)
}

export function connectXtWallet() {
    xtWalletStore$.update(async state => {
        if (connectionListener) return

        const wallet = new GenericExtensionWallet()
        const connection = await wallet.connect({
            appName: 'The DAppository',
            networkName: Vars.IsTestnet ? 'Signum-TESTNET' : 'Signum',
        })
        connectionListener = connection.listen({
            onAccountChanged,
            onAccountRemoved,
            onNetworkChanged,
            onPermissionRemoved,
        })

        state.wallet = wallet;
    })
}

export function disconnectXtWallet() {
    xtWalletStore$.update(async state => {
        if (connectionListener) {
            connectionListener.unlisten()
            connectionListener = null
        }
        state.wallet = null
    })
}
