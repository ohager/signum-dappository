import { BurstApi } from "../context";
import { ApplicationToken } from "../services/repositories/models/applicationToken";

export async function preloadToken(tokenId) {
  const contract = await BurstApi.contract.getContract(tokenId);
  return ApplicationToken.mapFromContract(contract);
}
