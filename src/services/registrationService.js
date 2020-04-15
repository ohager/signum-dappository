import { eventDispatcher } from '../utils/eventDispatcher'
import { BurstApi } from '../utils/burstApi.js'
import { BurstValue } from '@burstjs/util'

export class RegistrationService{
    constructor() {
        // this._dispatch = eventDispatcher(this)
        this._accountApi = BurstApi.account
        this._contractApi = BurstApi.contract
    }

    async getBalance(accountId) {
        const { balanceNQT } = await this._accountApi.getAccountBalance(accountId)
        return BurstValue.fromPlanck(balanceNQT).getBurst()
    }

    async _createContract() {
        const {} = await this._contractApi.publishContract()
    }

    async registerToken() {

    }
}

export const registrationService = new RegistrationService()
