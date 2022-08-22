<script>
    import TextField from '@smui/textfield'
    import HelperText from '@smui/textfield/helper-text/index'
    import Icon from '@smui/textfield/icon/index'
    import { assureAccountId } from '../../utils/assureAccountId'
    import { pruneLedgerErrorMessage } from '../../utils/pruneLedgerErrorMessage'
    import { accountService } from '../../services/accountService'
    import {convertNumericIdToAddress} from "./convertNumericIdToAddress";

    export let account = ''
    export let valid = false
    export let validate = () => Promise.resolve('')
    let validationTimeout = null
    let errorMessage = 'Account is required'

    $: accountAddress = valid ? convertNumericIdToAddress(account) : ''
    $: {
        if(account.length){
            validateAccount(account)
        }
    }
    function validateAccount(account) {

        if (validationTimeout) return

        validationTimeout = setTimeout(async () => {
            try {
                const accountId = assureAccountId(account)
                await accountService.getAccount(accountId)
                await validate(accountId)
                errorMessage =  ''
                valid = true
            } catch (e) {
                errorMessage = pruneLedgerErrorMessage(e.message || e)
                valid = false
            } finally {
                validationTimeout = null
            }
        }, 500)
    }

</script>

<div class="form--input">
    <div class="form--input-field">
        <TextField bind:value={account}
                   on:input={({target}) => validateAccount(target.value)}
                   invalid={!valid}
                   label='Account Id or Address'
                   withTrailingIcon
        >
            <Icon class={`material-icons ${valid ? 'green' : ''}`}>
                {valid ? 'check_circle' : 'error'}
            </Icon>
            <div class="address">
                {accountAddress}
            </div>
        </TextField>
        <HelperText validationMsg>{errorMessage}</HelperText>
    </div>
</div>


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
        color: var(--theme-text) !important;
    }
</style>
