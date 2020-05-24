import { readable } from 'svelte/store'
import { isClientSide } from '../utils/isClientSide'
import { FeeQuantPlanck, BurstValue } from '@burstjs/util'
import { BurstApi } from '../utils/burstApi'

const InitialFee = BurstValue.fromPlanck(FeeQuantPlanck.toString(10))

export const burstFee$ = readable(InitialFee, (set) => {
    if (!isClientSide()) return

    BurstApi.network.suggestFee().then(({standard}) => {
        set(BurstValue.fromPlanck(standard.toString(10)))
    })

    return () => {
        set(InitialFee)
    }
})
