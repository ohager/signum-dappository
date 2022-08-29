import { dispatchEvent } from '../utils/dispatchEvent'
import { Ledger } from '../context'
import { generateMasterKeys, getAccountIdFromPublicKey } from '@signumjs/crypto'
import { Amount } from '@signumjs/util'

export class AccountService {
    constructor() {
        this._dispatch = dispatchEvent
        this._accountApi = Ledger.account
        this._contractApi = Ledger.contract
    }

    async getSuggestedFee() {
        const fees = await Ledger.network.getSuggestedFees()
        return Amount.fromPlanck(fees.standard.toString(10))
    }

    getKeys(passphrase) {
        const { publicKey, signPrivateKey } = generateMasterKeys(passphrase)
        return {
            publicKey,
            signPrivateKey,
        }
    }

    async getAccount(accountId) {
        return Ledger.account.getAccount({ accountId })
    }

    async existsAccount(accountId) {
        try {
            await this.getAccount(accountId)
            return true
        } catch (e) {
            return false
        }
    }

    getAccountIdFromPassphrase(passphrase) {
        const { publicKey } = this.getKeys(passphrase)
        return getAccountIdFromPublicKey(publicKey)
    }

    async getBalance(accountId) {
        const { balanceNQT } = await this._accountApi.getAccountBalance(accountId)
        return Amount.fromPlanck(balanceNQT)
    }
}

export const accountService = new AccountService()
