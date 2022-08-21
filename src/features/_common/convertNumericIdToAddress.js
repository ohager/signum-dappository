import { Address } from '@signumjs/core'

export const convertNumericIdToAddress = id => {
    try {
        return Address.fromNumericId(id).getReedSolomonAddress()
    } catch (e) {
        return ''
    }
}
