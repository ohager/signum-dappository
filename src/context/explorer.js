import { Vars } from './vars'

const explorer = path => `${Vars.ExplorerUrl}${path}`

export const ExplorerApi = {
    getBlockUrl: blockId => explorer(`/block/${blockId}`),
    getAccountUrl: accountId => explorer(`/address/${accountId}`),
}
