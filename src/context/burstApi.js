import { composeApi } from '@signumjs/core'
import { Vars } from './vars'

export const BurstApi = composeApi({
    nodeHost: Vars.PeerUrl,
})
