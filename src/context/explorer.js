import { Vars } from './vars'

const explorer = path => `${Vars.ExplorerUrl}${path}`

export const ExplorerApi = {
    getBlockUrl: blockId => {
        console.info('Explorer does not support block urls')
        //explorer(`block/${blockId}`)
    },
    getAccountUrl: accountId => explorer(`?action=account&account=${accountId}`),
}
