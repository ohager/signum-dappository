import { ApiSettings, composeApi } from '@burstjs/core'

const Settings = new ApiSettings('http://testnet.getburst.net:6876')
export const BurstApi = composeApi(Settings)
