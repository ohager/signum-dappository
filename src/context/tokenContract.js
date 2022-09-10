import { Vars } from './vars'
import { Amount } from '@signumjs/util'

const TokenContract = {
    Name: 'd4PP0Z3',
    Reference: Vars.ContractReference,
    MethodHash: {
        transfer: '-8011735560658290665',
        deactivate: '-327803124352370',
        feature: '-6912935458706578184',
    },
    ActivationCosts: 5,
    DonationEntitlement: 100,
    FeatureCostsPerMinute: 1,
    CreationFee: Amount.fromSigna(0.5),
}

export { TokenContract }
