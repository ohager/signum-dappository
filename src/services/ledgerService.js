import { Vars } from '../context'
import { LedgerClientFactory } from '@signumjs/core'

export class LedgerService {
    constructor() {
        this.ledger = LedgerClientFactory.createClient({
            nodeHost: Vars.HostUrl,
        })
    }

    get client() {
        return this.ledger
    }

    updateNode(nodeHost) {
        if (nodeHost !== this.ledger.service.settings.nodeHost) {
            this.ledger = LedgerClientFactory.createClient({
                nodeHost: nodeHost,
            })
            console.debug('Updated node to', nodeHost)
        }
    }
}

export const ledgerService = new LedgerService()
