import { convertNumericIdToAddress, createDeeplink } from '@burstjs/util'
import { Vars } from '../context'

const redirectable = targetUrl => Vars.DeeplinkRedirectServiceUrl + targetUrl

export function mountLegacyDeepLink(recipientId, amountValue, feeValue, message = '') {
    const amountPlanck = amountValue.getPlanck()
    const feePlanck = feeValue.getPlanck()
    const address = convertNumericIdToAddress(recipientId)
    const link = `burst://requestBurst?receiver=${address}&amountNQT=${amountPlanck}&feeNQT=${feePlanck}&immutable=false`
    return redirectable(message ? `${link}&message=${message}` : link)
}

export function mountDeepLink(recipientId, amountValue, feeValue) {
    const amountPlanck = amountValue.getPlanck()
    const feePlanck = feeValue.getPlanck()
    const receiver = convertNumericIdToAddress(recipientId)
    return redirectable(createDeeplink({
            domain: 'payment',
            action: 'send',
            payload: {
                amountPlanck,
                receiver,
                feePlanck,
                immutable: false,
            },
        }),
    )
}
