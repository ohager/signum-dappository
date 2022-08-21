import { readable } from 'svelte/store'
import { isClientSide } from '../../utils/isClientSide'
import { Ledger } from '../../context'
import { voidFn } from '../../utils/voidFn'
import { Amount, FeeQuantPlanck } from '@signumjs/util'

const InitialFee = Amount.fromPlanck(FeeQuantPlanck.toString(10))

export const burstFee$ = readable(InitialFee, set => {
    if (!isClientSide()) return voidFn

    function fetchFee() {
        Ledger.network.suggestFee().then(({ standard }) => {
            set(Amount.fromPlanck(standard.toString(10)))
        })
    }

    fetchFee()
    let interval = setInterval(fetchFee, 60 * 1000 * 5)

    return () => {
        clearInterval(interval)
        set(InitialFee)
    }
})
