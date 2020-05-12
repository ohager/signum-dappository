<script>
    import { goto } from '@sapper/app'
    import TextField from '@smui/textfield'
    import HelperText from '@smui/textfield/helper-text/index'
    import Button, { Label } from '@smui/button'
    import { isEmptyString } from '../../utils/isEmptyString'
    import { RouteHome } from '../../utils/routes'
    import Page from '../../components/Page.svelte'


    let account = ''

    $: isAccountValid = !isEmptyString(account)

    function handleCancel() {
        goto(RouteHome())
    }

</script>

<Page>
    <div class="donation__header">
        <img src="/img/donation.svg" alt="donate">
    </div>
    <div class="donation__form">
        <div class="donation__form--header">
            <h4 class="mdc-typography--headline4">
                Header
            </h4>
        </div>
        <div class="donation__form--input">
            <div class="donation__form--input-field">
                <TextField bind:value={account}
                           invalid={!isAccountValid}
                           label="Account"
                />
                {#if isEmptyString(account)}
                    <HelperText>Enter the amount you like to donate</HelperText>
                {:else}
                    <HelperText validationMsg>Invalid Amount</HelperText>
                {/if}
            </div>
            <span class="mdc-typography--headline6">BURST</span>
        </div>
        <div class="donation__form--footer">
            <Button on:click={handleCancel}>
                <Label>Back</Label>
            </Button>
        </div>
    </div>
</Page>


<style>

    h4 {
        margin: 0.5rem
    }

    .donation__header {
        text-align: center;
        margin-bottom: 1rem;
    }

    .donation__header img {
        height: 96px;
        width: 96px;
        text-align: center;
    }

    .donation__form {
        display: block;
        max-width: 600px;
        margin: 0 auto
    }

    .donation__form--header {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 1rem;
    }

    .donation__form--header img {
        height: 64px;
        width: 64px;
        padding-right: 1rem;
    }

    .donation__form--footer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 2rem;
    }


    .donation__form--input {
        display: flex;
        align-items: center;
    }

    .donation__form--input-field {
        display: block;
        width: 100%;
    }

    .donation__form--qrcode {
        text-align: center;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .donation__form--qrcode > canvas {
        cursor: pointer;
    }

    .donation__form--qrcode > section {
        text-align: justify;
        font-size: 0.75rem;
        font-family: sans-serif;
        color: gray;
        line-height: 1rem;
    }

    .donation__form--qrcode > section > ul {
        margin: 0;
        padding: 0;
    }

    .donation__form--qrcode-infoitem {
        list-style: none;
    }

    @media (max-width: 480px) {
        .donation__form--qrcode {
            flex-direction: column;
        }

        .donation__form--qrcode > section > ul {
            text-align: center;
        }
    }

    :global(.donation__form .mdc-text-field__input) {
        font-size: 2rem !important;
    }

    :global(.donation__form .mdc-text-field) {
        width: 100% !important;
    }

</style>
