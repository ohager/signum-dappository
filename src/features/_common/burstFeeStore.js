import { readable } from 'svelte/store'
import { isClientSide } from '../../utils/isClientSide'
import { FeeQuantPlanck, BurstValue } from '@burstjs/util'
import { BurstApi } from '../../context'
import { voidFn } from '../../utils/voidFn'

const InitialFee = BurstValue.fromPlanck(FeeQuantPlanck.toString(10))

export const burstFee$ = readable(InitialFee, (set) => {
    if (!isClientSide()) return voidFn

    function fetchFee() {
        BurstApi.network.suggestFee().then(({standard}) => {
            set(BurstValue.fromPlanck(standard.toString(10)))
        })
    }

    fetchFee()
    let interval = setInterval(fetchFee, 60 * 1000 * 5)

    return () => {
        clearInterval(interval)
        set(InitialFee)
    }
})
