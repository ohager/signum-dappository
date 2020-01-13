import { ApiSettings, composeApi } from '@burstjs/core'
import { Config } from '../config'

const Settings = new ApiSettings(Config.PeerUrl)
export const BurstApi = composeApi(Settings)

export const pruneErrorMessage = brsError => brsError.replace(/\(Code:.*\)/, '')
