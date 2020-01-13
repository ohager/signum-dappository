<script>
    import TextField from '@smui/textfield'
    import HelperText from '@smui/textfield/helper-text/index'
    import { isEmptyString } from '../../../utils/isEmptyString'
    import { registration$ } from './registrationStore'
    import { MinimumRegistrationFeeBurst } from './constants'
    import { registrationService } from '../../../services/registrationService'
    import { assureAccountId } from '../../../utils/assureAccountId'
    import { onDestroy } from 'svelte'
    import { pruneErrorMessage } from '../../../utils/burstApi'

    const hasSufficientBalance = async (account) => {
        const accountId = assureAccountId(account)
        const balance = await registrationService.getBalance(accountId)
        return balance > MinimumRegistrationFeeBurst
    }

    let balanceTimeout = null
    let validationMessage = 'Account is required'

    $: isAccountValid = isEmptyString(validationMessage)

    let unsubscribe = registration$.subscribe(({ account }) => {
        if (isEmptyString(account)) return 'Account is required'

        if (!balanceTimeout) {
            balanceTimeout = setTimeout(async () => {
                try {
                    const ok = await hasSufficientBalance(account)
                    validationMessage = ok ? '' : `Insufficient Balance: You need at least ${MinimumRegistrationFeeBurst} BURST`
                } catch (e) {
                    validationMessage = pruneErrorMessage(e.message)
                } finally {
                    balanceTimeout = null
                }
            }, 250)
        }
    })

    onDestroy(() => {
        unsubscribe()
    })


</script>
<section>
    <div class="form--input">
        <div class="form--input-field">
            <TextField bind:value={$registration$.account}
                       invalid={!isAccountValid}
                       label='Account Id or Address'
            />
            {#if !isAccountValid}
                <HelperText validationMsg>{validationMessage}
                </HelperText>
            {/if}
        </div>
    </div>
</section>
