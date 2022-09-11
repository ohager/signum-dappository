import { generateMasterKeys, getAccountIdFromPublicKey } from '@signumjs/crypto'
import { Amount } from '@signumjs/util'
import { ledgerService } from './ledgerService'

export class AccountService {
    constructor() {}

    async getSuggestedFee() {
        const fees = await ledgerService.client.network.getSuggestedFees()
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
        return ledgerService.client.account.getAccount({ accountId })
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
        const { balanceNQT } = await ledgerService.client.account.getAccountBalance(accountId)
        return Amount.fromPlanck(balanceNQT)
    }
}

export const accountService = new AccountService()
