import { convertAddressToNumericId, isBurstAddress } from '@burstjs/util'

export const assureAccountId = (account) => {
    let id = account
    if (isBurstAddress(id)) {
        id = convertAddressToNumericId(id)
    }

    // TODO: support alias

    return id;
}
