import { Address } from '@signumjs/core'

export const assureAccountId = account => {
    let id = account
    try {
        return Address.fromReedSolomonAddress(account).getNumericId()
    } catch (e) {
        return id
    }

    // TODO: support alias

    return id
}
