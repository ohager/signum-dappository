import { ledgerService } from './ledgerService'

export class NetworkService {
    async getCurrentBlock() {
        const { blocks } = await ledgerService.client.block.getBlocks(0, 1, false)
        return blocks[0]
    }
}

export const networkService = new NetworkService()
