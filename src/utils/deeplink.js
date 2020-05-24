import { convertNumericIdToAddress, createDeeplink } from '@burstjs/util'

export function mountLegacyDeepLink(recipientId, amountValue, feeValue) {
    const amountPlanck = amountValue.getPlanck()
    const feePlanck = feeValue.getPlanck()
    const address = convertNumericIdToAddress(recipientId)
    return `burst://requestBurst?receiver=${address}&amountNQT=${amountPlanck}&feeNQT=${feePlanck}&immutable=false`
}

export function mountDeepLink(recipientId, amountValue, feeValue) {
    const amountPlanck = amountValue.getPlanck()
    const feePlanck = feeValue.getPlanck()
    const receiver = convertNumericIdToAddress(recipientId)
    return createDeeplink({
        domain: 'payment',
        action: 'send',
        payload: {
            amountPlanck,
            receiver,
            feePlanck,
            immutable: false,
        },
    })
}
