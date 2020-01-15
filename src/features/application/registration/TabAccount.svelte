<script>
    import TextField from '@smui/textfield'
    import HelperText from '@smui/textfield/helper-text/index'
    import Icon from '@smui/textfield/icon/index'
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
                const hasSufficientBalance = balance > MinimumRegistrationFeeBurst + 0.5
                validation = {
                    message: hasSufficientBalance
                            ? `Accounts balance: ${balance.toFixed(2)}`
                            : `Insufficient Balance (${balance.toFixed(2)} BURST): You need at least ${MinimumRegistrationFeeBurst} BURST`,
                    valid: hasSufficientBalance,
                }
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
        In order to register your application, you will (unfortunately) have to pay a fee of {MinimumRegistrationFeeBurst} BURST to create the token.
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
            {#if !validation.valid}
                <HelperText validationMsg>{validation.message}</HelperText>
            {/if}
        </div>
    </div>
</section>

<style>
    :global(.mdc-text-field__icon.material-icons.green) {
        color: green !important;
    }
</style>
