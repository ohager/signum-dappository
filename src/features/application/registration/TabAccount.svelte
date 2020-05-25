<script>
    import TextField from '@smui/textfield'
    import HelperText from '@smui/textfield/helper-text/index'
    import Icon from '@smui/textfield/icon/index'
    import { isEmptyString } from '../../../utils/isEmptyString'
    import { registration$ } from './registrationStore'
    import { assureAccountId } from '../../../utils/assureAccountId'
    import { onDestroy, onMount } from 'svelte'
    import { pruneErrorMessage } from '../../../utils/burstApi'
    import { accountService } from '../../../services/accountService'
    import { TokenContract } from '../../../services/tokenContract'
    import { convertNumericIdToAddress } from '@burstjs/util'

    export let accountId = ''

    onMount(() => {
        $registration$.account = accountId
    })

    async function getBalance(account) {
        const accountId = assureAccountId(account)
        return await accountService.getBalance(accountId)
    }

    async function validateAccount(account) {
        if (balanceTimeout) return

        balanceTimeout = setTimeout(async () => {
            try {
                const balance = await getBalance(account)
                const hasSufficientBalance = balance.greaterOrEqual(TokenContract.CreationFee)
                validation = {
                    message: hasSufficientBalance
                            ? `Accounts balance: ${balance.toString()}`
                            : `Insufficient Balance (${balance.toString()}): You need at least ${minimumBalance.toString()}`,
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
    $: accountAddress = isAccountValid ? convertNumericIdToAddress($registration$.account) : ''

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
        In order to register your application, you must provide a Burst account to which donations will be forwarded.
        You will also have to pay a fee of {TokenContract.ActivationCosts} BURST to create the token. This fee is
        used exclusively to create the token and no third party will receive anything.
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
                <div class="address">
                    {accountAddress}
                </div>
            </TextField>
            <HelperText validationMsg>{validation.message}</HelperText>
        </div>
    </div>
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
