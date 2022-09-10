<script>
  import TextField from '@smui/textfield'
  import HelperText from '@smui/textfield/helper-text/index'
  import Icon from '@smui/textfield/icon/index'
  import {TokenItemVariant, TokenItem} from '../_common/'
  import {registration$} from './registrationStore'
  import {isEmptyString} from '../../utils/isEmptyString'
  import {isValidPassphrase} from '../../utils/validators'
  import {MaxDataLength} from './constants'
  import {xtWallet$} from "../_common/xtWalletStore";

  let isPassphraseVisible = false
  let passphrase = ''
  let isPassphraseValid = false

  $: wallet = $xtWallet$.wallet
  $: message = () => {

    if (wallet) {
      $registration$.isPassphraseValid = true
      $registration$.passphrase = 'using-xtwallet'
      isPassphraseValid = true
      return ''
    }

    // this check avoids flicker while typing
    if ($registration$.isPassphraseValid !== isPassphraseValid) {
      $registration$.isPassphraseValid = false
    }

    if (isEmptyString(passphrase)) {
      isPassphraseValid = false
      return 'Please enter your passphrase to confirm your applications registration'
    }

    if (!isValidPassphrase(passphrase, $registration$.account)) {
      isPassphraseValid = false
      return 'Passphrase does not match given account'
    }
    $registration$.isPassphraseValid = true
    $registration$.passphrase = passphrase
    isPassphraseValid = true
    return ''
  }

  $: isInvalid = !isEmptyString(message())

  function toggleVisibility() {
    isPassphraseVisible = !isPassphraseVisible
  }
</script>

<section class="confirmation">
    <p class="mdc-typography--body1">
        This is what your application will look like as soon as the registration is complete. Please check everything
        carefully, because once registered applications cannot be changed anymore.
    </p>
    <div class="card-preview">
        <TokenItem data={{...$registration$, donationPlanck: '0'}} variant={TokenItemVariant.Preview}/>
    </div>

    <div class="form--input">
        {#if !wallet}
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
        {/if}
    </div>
</section>

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
