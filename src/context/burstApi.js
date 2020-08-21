import { ApiSettings, composeApi } from '@burstjs/core'
import { Vars } from './vars'

const Settings = new ApiSettings(Vars.PeerUrl)
export const BurstApi = composeApi(Settings)
