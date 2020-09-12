<script>
    import TextField from '@smui/textfield'
    import HelperText from '@smui/textfield/helper-text/index'
    import Icon from '@smui/textfield/icon/index'
    import { isEmptyString } from '../../utils/isEmptyString'
    import { registration$ } from './registrationStore'
    import { assureAccountId } from '../../utils/assureAccountId'
    import { onDestroy, onMount } from 'svelte'
    import { pruneBurstErrorMessage } from '../../utils/pruneBurstErrorMessage'
    import { accountService } from '../../services/accountService'
    import { TokenContract } from '../../context'
    import { BurstValue } from '@burstjs/util'
    import AccountInput from '../_common/AccountInput.svelte'

    export let accountId = ''

    let validation = {
        message: 'Account is required',
        valid: false,
    }

    onMount(() => {
        $registration$.account = accountId
    })

    async function getBalance(account) {
        const accountId = assureAccountId(account)
        return await accountService.getBalance(accountId)
    }

    async function validateAccount(account) {
        const balance = await getBalance(account)
        const minimumBalance = TokenContract.CreationFee.add(BurstValue.fromBurst(1))
        if(!balance.greaterOrEqual(minimumBalance)){
            throw new Error(`Insufficient Balance (${balance.toString()}): You need at least ${minimumBalance.toString()}`)
        }
    }

</script>

<section>
    <p class="mdc-typography--body1">
        In order to register your application, you must provide a Burst account to which donations will be forwarded.
        You will also have to pay a fee of {TokenContract.ActivationCosts} BURST to create the token. This fee is
        used exclusively to create the token and no third party will receive anything.
    </p>
    <AccountInput bind:account={$registration$.account}
                  bind:valid={validation.valid}
                  validate={validateAccount}
    />
</section>

<style>
    :global(.mdc-text-field__icon.material-icons.green) {
        color: green !important;
    }

    .address {
        position: absolute;
        top: 24px;
        right: 32px;
        font-size: 75%;
        font-family: monospace;
        color: rgba(0,0,0,.6);
    }
</style>
