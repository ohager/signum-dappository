<script>
    import TextField from '@smui/textfield'
    import HelperText from '@smui/textfield/helper-text/index'
    import { isEmptyString } from '../../../utils/isEmptyString'
    import { afterUpdate } from 'svelte'
    import { registration$ } from './registrationStore'
    import { isValidAccount } from './validators'

    $: isAccountValid = isValidAccount($registration$.account)

    function getValidationMessage(a){
        if(isEmptyString(a)) return 'Account is required'

        return ''
    }

</script>
<section>
    <div class="form--input">
        <div class="form--input-field">
            <TextField bind:value={$registration$.account}
                       invalid={!isAccountValid}
                       label='Account Id/Address or Alias'
            />
            {#if !isAccountValid}
                <HelperText validationMsg>{getValidationMessage($registration$.account)}
                </HelperText>
            {/if}
        </div>
    </div>
</section>
