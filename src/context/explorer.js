import { Vars } from './vars'

const explorer = path => `${Vars.ExplorerUrl}${path}`

export const ExplorerApi = {
    getBlockUrl: blockId => explorer(`?action=blocks&height=${blockId}`),
    getAccountUrl: accountId => explorer(`?action=account&account=${accountId}`),
}
