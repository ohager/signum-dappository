import { readable } from 'svelte/store'
import { isClientSide } from '../../utils/isClientSide'
import { Config } from '../../config'
import { BurstApi } from '../../utils/burstApi'

const InitialState = [{
    amountNQT: "19265000",
    deadline: 1440,
    ecBlockHeight: 785298,
    ecBlockId: "10416408015828356215",
    feeNQT: "735000",
    fullHash: "0fc2c8b47a85123c55996e532eabbe795bf982260fda9cf60a42c9d83e873c1e",
    height: 785310,
    recipient: "15538301941855822402",
    recipientRS: "BURST-7UUZ-5BEB-FAZF-7QZRP",
    sender: "2402520554221019656",
    senderPublicKey: "a187a3f685b514b8657affa6db1a18e5d07ec7c0577f57571e71b5558433b43d",
    senderRS: "BURST-H9JC-RF3B-XAKH-3ANGC",
    signature: "d11c85c273f9e06e88dfe932b0c818c3a463814050cedd52d84265e53627cc00ce0602c3c06ce82269510032ec9965e817ef4a7d60884f0cf9044e07809c4aa5",
    signatureHash: "bac405390a0331a6195025838f1defadfdf4a8282b2857137d7ce2cd90861f26",
    subtype: 0,
    timestamp: 189881619,
    transaction: "4328668953922028047",
    type: 0,
    version: 1,
}]
const UpdateInterval = Config.UnconfirmedTxPollingIntervalSecs

export const unconfirmedTransactions$ = readable(InitialState, (set) => {
    if (!isClientSide()) return

    const updateUnconfirmedTx = async () => {
        const { unconfirmedTransactions } = await BurstApi.transaction.getUnconfirmedTransactions()
        set(unconfirmedTransactions)
    }
    updateUnconfirmedTx()
    const interval = setInterval(updateUnconfirmedTx, UpdateInterval)
    return () => {
        clearInterval(interval)
        set(InitialState)
    }
})
