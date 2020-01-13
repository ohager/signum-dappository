import { eventDispatcher } from '../utils/eventDispatcher'
import { BurstApi } from '../utils/burstApi.js'
import { convertNQTStringToNumber } from '@burstjs/util'

export class RegistrationService{
    constructor() {
        // this._dispatch = eventDispatcher(this)
        this._accountApi = BurstApi.account
    }

    async getBalance(accountId) {
        const { balanceNQT } = await this._accountApi.getAccountBalance(accountId)
        return convertNQTStringToNumber(balanceNQT)
    }
}

export const registrationService = new RegistrationService()
