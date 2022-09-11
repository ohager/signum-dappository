import { ApplicationToken } from '../services/repositories/models/applicationToken'
import { ledgerService } from '../services/ledgerService'

export async function preloadToken(tokenId) {
    const contract = await ledgerService.client.contract.getContract(tokenId)
    return ApplicationToken.mapFromContract(contract)
}
