import { readable } from 'svelte/store'
import { isClientSide } from '../../utils/isClientSide'
import { voidFn } from '../../utils/voidFn'
import { Amount, FeeQuantPlanck } from '@signumjs/util'
import { ledgerService } from '../../services/ledgerService'

const InitialFee = Amount.fromPlanck(FeeQuantPlanck.toString(10))

export const fee$ = readable(InitialFee, set => {
    if (!isClientSide()) return voidFn

    function fetchFee() {
        ledgerService.client.network.getSuggestedFees().then(({ standard }) => {
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
