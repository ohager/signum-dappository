<script>
    import TextField from '@smui/textfield'
    import HelperText from '@smui/textfield/helper-text/index'
    import Icon from '@smui/textfield/icon/index'
    import { isEmptyString } from '../../utils/isEmptyString'
    import { isValidPassphrase } from '../../utils/validators'

    export let valid = false
    export let account = ''
    export let passphrase = ''
    let isPassphraseVisible = false
    let isPassphraseValid = false

    $: message = () => {
        if (isEmptyString(passphrase)) {
            isPassphraseValid = false
            return 'Please enter your passphrase to confirm the action'
        }

        if (!isValidPassphrase(passphrase, account)) {
            isPassphraseValid = false
            return 'Passphrase does not match given account'
        }
        return ''
    }

    $: isInvalid = !isEmptyString(message())
    $: {
        valid = !isInvalid
    }

    function toggleVisibility() {
        isPassphraseVisible = !isPassphraseVisible
    }
</script>

<div class="form--input">
    <div class="form--input-field">
        <TextField
                bind:value={passphrase}
                invalid={isInvalid}
                label="Passphrase"
                type={isPassphraseVisible ? 'text' : 'password'}
                withTrailingIcon
        >
            <Icon class="material-icons"
                  role="button"
                  on:click={toggleVisibility}>{isPassphraseVisible ? 'visibility_off' : 'visibility'}
            </Icon>
        </TextField>
        {#if isInvalid}
            <HelperText validationMsg>{message()}</HelperText>
        {/if}
    </div>
</div>

<style>

    .form--input {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 1rem;
        width: 100%;
    }

    .form--input-field {
        display: block;
        width: 100%;
    }

    .form--input-field :global(.mdc-text-field) {
        width: 100%;
    }

    :global(.form .mdc-text-field__input) {
        font-size: 100% !important;
    }
    :global(.mdc-text-field) {
        width: 100% !important;
    }
</style>
