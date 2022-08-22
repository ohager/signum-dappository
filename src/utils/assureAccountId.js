import { Address } from '@signumjs/core'

export const assureAccountId = account => {
    try {
        return Address.fromReedSolomonAddress(account).getNumericId()
    } catch (e) {
        return account
    }
}
