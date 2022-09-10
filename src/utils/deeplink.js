import { createDeeplink } from '@signumjs/util'
import { Vars } from '../context'
import { convertNumericIdToAddress } from '../features/_common'

const redirectable = targetUrl => Vars.DeeplinkRedirectServiceUrl + encodeURIComponent(targetUrl)

export function mountDeepLink(recipientId, amountValue, feeValue) {
    const amountPlanck = amountValue.getPlanck()
    const feePlanck = feeValue.getPlanck()
    const recipient = convertNumericIdToAddress(recipientId)
    return redirectable(
        createDeeplink({
            action: 'pay',
            payload: {
                amountPlanck,
                recipient,
                feePlanck,
                immutable: false,
            },
        }),
    )
}
