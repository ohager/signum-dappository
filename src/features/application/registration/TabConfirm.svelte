<script>
    import TextField from '@smui/textfield'
    import HelperText from '@smui/textfield/helper-text/index'
    import Icon from '@smui/textfield/icon/index'
    import ApplicationItem from '../list/ApplicationItem.svelte'
    import { registration$ } from './registrationStore'
    import { isEmptyString } from '../../../utils/isEmptyString'
    import { isValidPassphrase } from './validators'

    export let value = passphrase
    let passphrase = ''
    let isPassphraseVisible = false

    $: message = () => {
        if (isEmptyString(passphrase)) {
            return 'Please enter your passphrase to confirm your applications registration'
        }
        if (!isValidPassphrase(passphrase, $registration$.account)) {
            return 'Passphrase does not match given account'
        }
        return ''
    }

    $: isInvalid = !isEmptyString(message())

    function toggleVisibility() {
        isPassphraseVisible = !isPassphraseVisible
    }
</script>

<style>
    .confirmation {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .card-preview {
        margin-bottom: 2rem;
    }

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

    :global(.mdc-text-field) {
        width: 100% !important;
    }

</style>

<section class="confirmation">
    <div class="card-preview">
        <ApplicationItem data={{...$registration$, donationPlanck: '0'}} isPreview/>
    </div>
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
</section>
