<script>
    import TextField from '@smui/textfield'
    import HelperText from '@smui/textfield/helper-text/index'
    import Icon from '@smui/textfield/icon/index'
    import { BurstValue } from '@burstjs/util'
    import { isEmptyString } from '../../../utils/isEmptyString'
    import { registration$ } from './registrationStore'
    import { MinimumRegistrationFeeBurst } from './constants'
    import { registrationService } from '../../../services/registrationService'
    import { assureAccountId } from '../../../utils/assureAccountId'
    import { onDestroy } from 'svelte'
    import { pruneErrorMessage } from '../../../utils/burstApi'

    async function getBalance(account) {
        const accountId = assureAccountId(account)
        return await registrationService.getBalance(accountId)
    }

    async function validateAccount(account) {
        if (balanceTimeout) return

        balanceTimeout = setTimeout(async () => {
            try {
                const balance = await getBalance(account)
                const minimumBalance = BurstValue.fromBurst(MinimumRegistrationFeeBurst + 0.5);
                const hasSufficientBalance = balance.greaterOrEqual(minimumBalance)
                validation = {
                    message: hasSufficientBalance
                            ? `Accounts balance: ${balance.toString()}`
                            : `Insufficient Balance (${balance.toString()}): You need at least ${minimumBalance.toString()}`,
                    valid: hasSufficientBalance,
                }

                console.log('val', validation)

            } catch (e) {
                validation = {
                    message: pruneErrorMessage(e.message),
                    valid: false,
                }
            } finally {
                balanceTimeout = null
            }
        }, 500)
    }

    let balanceTimeout = null
    let validation = {
        message: 'Account is required',
        valid: false,
    }

    $: isAccountValid = validation.valid

    const unsubscribe = registration$.subscribe(({ account }) => {
        if (!isEmptyString(account)) {
            validateAccount(account)
        }
    })

    onDestroy(() => {
        unsubscribe()
    })

</script>

<section>
    <p class="mdc-typography--body1">
        In order to register your application, you must provide a Burst account to which donations will be forwarded. You will also have to pay a fee of {MinimumRegistrationFeeBurst} BURST to create the token. This fee is used exclusively to create the token and no third party will receive anything.
    </p>
    <div class="form--input">
        <div class="form--input-field">
            <TextField bind:value={$registration$.account}
                       invalid={!validation.valid}
                       label='Account Id or Address'
                       withTrailingIcon
            >
                <Icon class={`material-icons ${validation.valid ? 'green' : ''}`}>
                    {validation.valid ? 'check_circle' : 'error'}
                </Icon>
            </TextField>
            <HelperText validationMsg>{validation.message}</HelperText>
        </div>
    </div>
</section>

<style>
    :global(.mdc-text-field__icon.material-icons.green) {
        color: green !important;
    }
</style>
