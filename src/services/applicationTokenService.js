import { applicationTokenRepository } from '../repositories/applicationTokenRepository.js'
import { dispatchEvent } from '../utils/dispatchEvent'
import { BurstApi } from '../utils/burstApi.js'
import { Config } from '../config.js'
import { ApplicationToken } from '../repositories/applicationToken'
import { Events } from '../utils/events'
import { accountService } from './accountService'
import { BurstValue } from '@burstjs/util'
import { getAccountIdFromPublicKey } from '@burstjs/crypto'
import { ProxyApi } from '../utils/proxyApi'
import { signTransaction } from '../utils/signTransaction'

const MaxParallelFetches = 6

export const Contract = {
    Version: 1,
    Name: 'BurstAppToken',
    Bytecode: '010f0000001000000000000000320b033504010e00000012470600003033040304000000350001050000001e05000000072835070304000000320a0335040107000000350603060000003209033504010b000000010800000017f898a0f498d09007080000000b0000001e08000000173505011000000012b10000001a1d00000001080000008e7a3763ddd5feff07080000000b0000001e080000001012870600001a1d00000012200200001a1d00000001080000000100000000000000060f00000008000000120406000001080000000100000000000000070f0000000800000011080000001e080000000b1aee0100001e020000000b1aee0100003316010300000001080000004f776e657273686933100108000000010800000070207472616e7366331101080000000108000000657272656400000033120108000000010800000000000000000000003313010800000032050402090000000f0000000e0800000009000000100800000011080000003316010800000001080000004f776e657273686933100108000000010800000070206772616e7465331101080000000108000000640000000000000033120108000000010800000000000000000000003313010800000032050402090000000f0000000e0800000009000000100800000011030000001a1f02000001080000000100000000000000060f00000008000000122507000001080000000100000000000000070f000000080000001302090000000f0000001409000000050000001e020000000b1aaf02000002090000000f0000000e08000000090000001008000000110800000033100108000000350603080000001008000000010900000000e40b54020000001009000000110900000011080000000708000000090000001008000000110800000003090000002008000000090000000f1a7203000002090000000f0000000e08000000090000001008000000110800000033100108000000320a033504010800000010080000001108000000331601080000000108000000446f6e6174696f6e3310010800000001080000002072656675736564331101080000000108000000000000000000000033120108000000010800000000000000000000003313010800000032050401080000000300000000000000060f00000008000000122507000001080000000300000000000000070f000000080000001302090000000f0000000e08000000090000001008000000110800000033100108000000350603080000001008000000010900000000e40b54020000001009000000110900000011080000000708000000090000001008000000110800000002090000000f000000040900000014090000000800000001090000000100000000000000100900000011090000000208000000010000000608000000090000001008000000110100000002090000000f00000004090000000e0800000009000000100800000011090000000208000000000000000608000000090000001008000000110000000002090000000f00000004090000000e080000000900000010080000001109000000331601030000003302040900000002090000000f0000000e0800000009000000100800000011080000003310010800000032090335040108000000100800000035050108000000100800000035060108000000100800000035070108000000100800000033160103000000110800000033130108000000110800000033120108000000110800000033110108000000110800000033100108000000320504010900000000e40b5402000000100900000002090000000f0000000e08000000090000001008000000110800000033100108000000320a0335040108000000100800000011080000001109000000331601080000003302040900000002090000000f0000000e08000000090000001008000000110800000033100108000000320a0335040108000000100800000011080000003316010800000001080000005468616e6b20796f331001080000000108000000752100000000000033110108000000010800000000000000000000003312010800000001080000000000000000000000331301080000003205041333100105000000320a03350401080000001008000000020800000003000000110900000007080000000900000003090000001e080000000b04090000001009000000130309000000100900000011000000000309000000100900000011010000000109000000010000000000000010090000001102000000100e000000110300000013120406000011080000001e080000000b1a1f0700001e020000000b1a1f0700000309000000100900000011020000003316010300000001080000004170706c69636174331001080000000108000000696f6e20646561633311010800000001080000007469766174656400331201080000000108000000000000000000000033130108000000320504331601030000003203041a24070000122507000013331601070000003302040600000013',
    MethodHash: {
        transfer: '-8011735560658290665',
        deactivate: '-327803124352370',
    },
    ExecutionCosts: 35,
    CreationFee: 11,
}

export class ApplicationTokenService {

    constructor(repository = applicationTokenRepository) {
        this._repository = repository
        this._dispatch = dispatchEvent
    }

    _fetchContractDetailsChunked(contractIds) {
        return Promise.all(
            contractIds.map(cid => BurstApi.contract.getContract(cid)),
        )
    }

    async _fetchContractIds() {
        const { atIds } = await BurstApi.contract.getAllContractIds(null)
        const firstContractId = atIds.lastIndexOf(Config.FirstApplicationContractId)
        return atIds.slice(firstContractId - 1)
    }

    async syncTokens() {
        this._dispatch(Events.Start)
        try {
            const contractIds = await this._fetchContractIds()
            const total = contractIds.length
            this._dispatch(Events.Progress, { total, processed: 0 })
            while (contractIds.length) {
                const chunkedIds = []
                for (let i = 0; i < MaxParallelFetches; ++i) {
                    const id = contractIds.pop()
                    if (id) {
                        chunkedIds.push(id)
                    }
                }
                const contracts = await this._fetchContractDetailsChunked(chunkedIds)
                const appTokens = contracts
                    .filter(contract => contract.name.startsWith(Contract.Name))
                    .filter(contract => !contract.dead)
                    .map(ApplicationToken.mapFromContract)
                    .forEach(console.log)
                    // .filter(token => token && token.isActive)
                await this._repository.upsertBulk(appTokens)
                this._dispatch(Events.Progress, { total, processed: total - contractIds.length })
            }
        } catch (e) {
            this._dispatch(Events.Error, e.message)
        } finally {
            this._dispatch(Events.Finish)
        }
    }

    getCollection() {
        return this._repository.collection
    }

    async getToken(tokenId) {
        return await this.getCollection().where('at').equals(tokenId).first()
    }

    async getTokens() {
        return await this._repository.get()
    }

    async toggleFavorite(id) {
        const { favorite } = await this._repository.get(id)
        await this._repository.update(id, { favorite: !favorite })
    }

    async deactivateToken(contractId, passphrase) {
        try {
            const { signPrivateKey, publicKey } = accountService.getKeys(passphrase)
            const feeValue = await accountService.getSuggestedFee()
            await BurstApi.contract.callContractMethod({
                amountPlanck: BurstValue.fromBurst(Contract.ExecutionCosts).getPlanck(),
                contractId,
                feePlanck: feeValue.getPlanck(),
                methodHash: Contract.MethodHash.deactivate,
                senderPrivateKey: signPrivateKey,
                senderPublicKey: publicKey,
            })
        } catch (e) {
            this._dispatch(Events.Error, e.message)
        }
    }

    async transferToken(contractId, passphrase) {
        try {
            const { signPrivateKey, publicKey } = this._getKeys(passphrase)
            const feeValue = await this._getSuggestedFee()
            await BurstApi.contract.callContractMethod({
                amountPlanck: BurstValue.fromBurst(Contract.ExecutionCosts).getPlanck(),
                contractId,
                feePlanck: feeValue.getPlanck(),
                methodHash: Contract.MethodHash.deactivate,
                senderPrivateKey: signPrivateKey,
                senderPublicKey: publicKey,
            })
        } catch (e) {
            this._dispatch(Events.Error, e.message)
        }
    }

    getMinimumRegistrationBalance() {
        return BurstValue.fromBurst(Contract.CreationFee + 0.5)
    }

    async registerToken(tokenData, passphrase) {
        try {
            const { publicKey, signPrivateKey } = accountService.getKeys(passphrase)
            const accountId = getAccountIdFromPublicKey(publicKey)
            const balanceBurst = await accountService.getBalance(accountId)
            const minimumBalance = this.getMinimumRegistrationBalance()
            if (balanceBurst.less(minimumBalance)) {
                throw new Error(`Accounts balance needs at least ${minimumBalance.toString()}`)
            }
            let unsignedMessage = await ProxyApi.createContract({
                code: Contract.Bytecode,
                minActivationAmountNQT: BurstValue.fromBurst(Contract.ExecutionCosts).getPlanck(),
                description: JSON.stringify(tokenData),
                name: Contract.Name,
                publicKey,
            })
            let signedTransaction = signTransaction(unsignedMessage, publicKey, signPrivateKey)
            const transactionId = await ProxyApi.broadcastTransaction(signedTransaction)
            console.log('Transaction:', transactionId)
            this._dispatch(Events.Success, "Token successfully generated")
        } catch (e) {
            this._dispatch(Events.Error, e.message)
        }
    }


}

export const applicationTokenService = new ApplicationTokenService()
