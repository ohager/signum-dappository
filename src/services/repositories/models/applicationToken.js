/** Original Contract Data
 at: "347549679294837383"
 atRS: "TS-QWN9-LY64-M5VL-2YPNB"
 atVersion: 1
 balanceNQT: "430000000"
 creationBlock: 110911
 creator: "2402520554221019656"
 creatorRS: "TS-QAJA-QW5Y-SWVP-4RVP4"
 dead: false
 description: "Echo, created with BlockTalk"
 finished: true
 frozen: true
 machineCode: "010e0000000f000000000000003033040303000000350001040000001e04000000072835070303000000320a0335040106000000350603050000003209033504010a0000000107000000d241f78359ea91c307070000000a0000001e07000000253505010f0000003506011000000035070112000000128a0000001a0e00000012f30000001a0e00000002080000000e0000000e07000000080000001007000000110000000002080000000e00000004080000000e07000000080000001007000000110100000002080000000e0000000408000000040800000004080000000e070000000800000010070000001102000000133310010400000032090335040107000000100700000035050107000000100700000035060107000000100700000035070107000000100700000033100104000000320a03350401070000001007000000110700000033160107000000110700000033130107000000110700000033120107000000110700000033110107000000110700000033100107000000320504130000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
 machineData: "0100000000000000d2040000000000000822eb07b777572101000000fbb30100000000000000000000000000000000000822eb07b77757210822eb07b777572112000000000000000000000000000000d241f78359ea91c30000000000000000000000000000000000000000000000000f000000000000000100000000000000d20400000000000000000000000000000822eb07b7775721000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007b0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000822eb07b7775721"
 minActivation: "2000000000"
 name: "ArgTests"
 nextBlock: 111612
 prevBalanceNQT: "430000000"
 requestProcessingTime: 2
 running: false
 stopped: false
 */

import MagicMapper from 'magic-mapper'
import { ContractDataView } from '@signumjs/contracts'
import { TokenStatus } from '../../../utils/tokenStatus'
import {Vars} from "../../../context";

const mapper = new MagicMapper({
    exclusive: true,
    propertyTransform: propertyName => {
        if (propertyName === 'balanceNQT') {
            return 'balancePlanck'
        }
        if (propertyName === 'minActivation') {
            return 'minActivationPlanck'
        }
        return propertyName
    },
})

const mappingSchema = {
    at: MagicMapper.Direct,
    creator: MagicMapper.Direct,
    machineData: MagicMapper.Direct,
    description: MagicMapper.Direct,
    creationBlock: MagicMapper.Direct,
    balancePlanck: MagicMapper.Direct,
    minActivationPlanck: MagicMapper.Direct,
}

const infoMappingSchema = {
    name: MagicMapper.Direct,
    desc: MagicMapper.Direct,
    img: MagicMapper.Direct,
    repo: MagicMapper.Direct,
    tags: MagicMapper.Direct,
}

const ContractDataIndices = {
    Version: 0,
    Active: 1,
    Inventor: 2,
    Donated: 3,
    DonationCount: 4,
    FeatureActiveUntilTimestamp: 5,
    Owner: 6,
}

function parseMachineData(contract) {
    const view = new ContractDataView(contract)
    const version = parseInt(view.getVariableAsDecimal(ContractDataIndices.Version), 10)
    const isActive = parseInt(view.getVariableAsDecimal(ContractDataIndices.Active), 10) === 1
    const donationPlanck = view.getVariableAsDecimal(ContractDataIndices.Donated)
    const donationCount = view.getVariableAsDecimal(ContractDataIndices.DonationCount)
    const featureActiveUntilTimestamp = view.getVariableAsDecimal(
        ContractDataIndices.FeatureActiveUntilTimestamp,
    )
    const owner = view.getVariableAsDecimal(ContractDataIndices.Owner)
    return {
        version,
        isActive,
        donationPlanck,
        donationCount,
        // FIX: convert that synthetic timestamp into block height
        // return (value >>32) + " (block height)";
        featureActiveUntilTimestamp,
        owner,
    }
}

function parseStatus(contract) {
    const { dead, frozen, finished, running, stopped } = contract
    if (dead) return TokenStatus.Dead
    if (finished) return TokenStatus.Ok
    if (stopped) return TokenStatus.Ok
    if (running) return TokenStatus.Running
    if (frozen) return TokenStatus.NoFunds
}

export class ApplicationToken {
    constructor(data) {
        Object.keys(data).forEach(k => (this[k] = data[k]))
    }

    static schema() {
        return 'at, creator, owner, name, creationBlock, donation, donationCount'
    }

    static mapFromContract(contract) {
        const data = mapper.map(contract, mappingSchema)
        try {
            const info = mapper.map(JSON.parse(data.description), infoMappingSchema)
            const state = parseMachineData(contract)
            const status = parseStatus(contract)
            delete data.description
            delete data.machineData

            if (data.creationBlock < Vars.MaxLegacyBlockHeight) {
                info.tags.push('legacy')
            }

            return new ApplicationToken({ ...data, ...info, ...state, status })
        } catch (e) {
            return null // ignore unreadable contract
        }
    }
}
