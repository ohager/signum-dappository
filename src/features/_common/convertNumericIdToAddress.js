import { Address } from '@signumjs/core'
import { Vars } from '../../context'

export const convertNumericIdToAddress = id => {
    try {
        const prefix = Vars.IsTestnet ? 'TS' : 'S'
        return Address.fromNumericId(id, prefix).getReedSolomonAddress()
    } catch (e) {
        return ''
    }
}
