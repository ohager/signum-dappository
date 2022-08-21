import { LedgerClientFactory } from '@signumjs/core'
import { Vars } from './vars'

export const Ledger = LedgerClientFactory.createClient({
    nodeHost: Vars.PeerUrl,
})
