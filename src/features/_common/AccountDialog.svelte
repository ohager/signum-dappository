<script>
    import { goto, prefetch } from '@sapper/app'
    import Dialog, { Title, Content, Actions, InitialFocus } from '@smui/dialog'
    import Button, { Label } from '@smui/button'
    import TextField from '@smui/textfield'
    import HelperText from '@smui/textfield/helper-text/index'
    import { RouteAccountTokens, RouteRegister } from '../../utils/routes'
    import { Events } from '../../utils/events'
    import { assureAccountId } from '../../utils/assureAccountId'
    import { isEmptyString } from '../../utils/isEmptyString'
    import { dispatchEvent } from '../../utils/dispatchEvent'
    import debounce from 'lodash.debounce'
    import { accountService } from '../../services/accountService'
    import { setAccount } from './accountStore'

    let isRegistering = false
    let account = ''
    let isValidating = false
    let isValid = false
    let dialog = null

    async function validateAccount(accountId) {
        isValidating = true
        isValid = await accountService.existsAccount(accountId)
        isValidating = false
    }

    const debouncedValidateAccount = debounce(validateAccount, 300)

    $: accountId = assureAccountId(account)
    $: {
        debouncedValidateAccount(accountId)
    }

    function handleEnter() {
        prefetch(RouteAccountTokens(accountId))
        dispatchEvent(Events.ShowAccountDialog, false)
        setAccount(accountId)
        setTimeout(() => {
            goto(RouteAccountTokens(accountId))
        }, 500)
    }

    function handleRegister() {
        setAccount(accountId)
        prefetch(RouteRegister())
        dispatchEvent(Events.ShowAccountDialog, false)
        setTimeout(() => {
            goto(RouteRegister())
        }, 500)
    }

    function handleCancel() {
        dispatchEvent(Events.ShowAccountDialog, false)
    }

    function showDialog({ detail }) {
        const {isVisible, wantsRegister = false} = detail
        isRegistering = wantsRegister
        if (isVisible) {
            dialog.open()
        } else {
            dialog.close()
        }
    }

</script>

<svelte:window on:show-account-dialog={showDialog}/>

<Dialog bind:this={dialog} scrimClickAction="" escapeKeyAction="">
    <Title>Enter Account Zone</Title>
    <Content>
        <div class="icon-wrapper">
            <img src="/img/login.svg" alt="Account Zone">
        </div>
        <p>
            In the Account Zone you can see the tokens of a single account. This is especially useful for the token
            owners, because there are more functions like (de)activation and transfer available. Please note that
            for these actions the passphrase is required.
        </p>

        <TextField
                bind:value={account}
                invalid={!isValid}
                label="Account"
        />
        {#if isEmptyString(account)}
            <HelperText>Enter a valid account address or id</HelperText>
        {:else}
            <HelperText validationMsg>The account is not valid</HelperText>
        {/if}
    </Content>
    <Actions>
        <Button on:click={handleCancel}>
            <Label>Cancel</Label>
        </Button>
        <Button on:click={isRegistering ? handleRegister : handleEnter} disabled={!isValid || isValidating}>
            <Label>{isValidating ? 'Checking...' : 'Enter'}</Label>
        </Button>
    </Actions>
</Dialog>

<style>
    .icon-wrapper {
        text-align: center;
    }

    .icon-wrapper > img {
        height: 128px;
    }
</style>
