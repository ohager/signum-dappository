import { readable } from 'svelte/store'
import { unconfirmedTransactionService } from '../../services/unconfirmedTransactionService'
import { isClientSide } from '../../utils/isClientSide'
import { Events } from '../../utils/events'
import { Config } from '../../config'

const InitialState = []
const UpdateInterval = Config.UnconfirmedTxPollingIntervalSecs

export const unconfirmedTransactions$ = readable(InitialState, (set) => {
    if (!isClientSide()) return

    const updateUnconfirmedTx = async () => {
        await unconfirmedTransactionService.syncUnconfirmedTransactions()
        const utx = await unconfirmedTransactionService.getUnconfirmedTransactions()
        set(utx)
    }
    updateUnconfirmedTx()
    const interval = setInterval(updateUnconfirmedTx, UpdateInterval)
    return () => {
        clearInterval(interval)
        set(InitialState)
    }
})
