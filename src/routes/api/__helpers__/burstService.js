import { BurstService } from '@burstjs/core'

export const burstService = new BurstService({
    nodeHost: process.env.SAPPER_APP_BURST_PEER_URL,
})
