import { Ledger } from '../context'

export class NetworkService {
    async getCurrentBlock() {
        const { blocks } = await Ledger.block.getBlocks(0,1,false)
        return blocks[0]
    }
}

export const networkService = new NetworkService()
