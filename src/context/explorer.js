import { Vars } from './vars'

const explorer = path => `${Vars.ExplorerUrl}${path}`

export const ExplorerApi = {
    getBlockUrl: blockId => {
        console.info('Explorer does not support block urls')
    },
    getAccountUrl: accountId => explorer(`?action=account&account=${accountId}`),
}
