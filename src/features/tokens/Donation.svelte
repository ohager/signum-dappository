<script>
    import TextField from '@smui/textfield'
    import HelperText from '@smui/textfield/helper-text/index'
    import Button, { Label } from '@smui/button'
    import {Page, TokenItem, TokenItemVariant, feeStore, PaymentQrCode, xtWalletStore } from '../_common'
    import { TokenContract } from '../../context'
    import {Amount} from "@signumjs/util";
    import {xtWallet$} from "../_common/xtWalletStore";

    export let token = {
        at: '',
        name: '',
        desc: '',
        repo: '',
        img: null,
        tags: [],
        donationPlanck: '0',
        isActive: true,
    }

    const { fee$ } = feeStore
    const AmountValidationPattern = /^[1-9]\d*$/

    let amount = ''

    $: isConnectedtWithXt =  $xtWallet$.wallet !== null
    $: isValidAmount = AmountValidationPattern.test(amount)
    $: isEmptyAmount = amount.length === 0
    $: isQrCodeVisible = !isEmptyAmount && isValidAmount
    $: suggestedFee = $fee$
    $: costs = isQrCodeVisible ? [
        ['Donation:', Amount.fromSigna(amount || 0)],
        ['Entitlement (will be reimbursed):', Amount.fromSigna(TokenContract.DonationEntitlement)],
    ] : []

    function handleCancel() {
        history.back()
    }

</script>


<Page id="donation">
    <div class="header">
        <img src="/img/donation.svg" alt="donate">
        <div class="mdc-typography--headline6">Donate</div>
    </div>
    <div class="form">
        <div class="form--header">
            <article class="description">
                <p class="mdc-typography--body1">
                    Exemplary Attitude!
                </p>
                <p class="mdc-typography--body1">
                    Donating not only helps the project itself and fills the owner with pride through
                    the experienced recognition, but also helps the Signum community. Thank you very much.
                </p>
                <p class="mdc-typography--body1">
                    Note that you will be charged an <em>Entitlement Fee</em> of {TokenContract.DonationEntitlement} SIGNA.
                    But it will be reimbursed entirely once the donation was processed.
                </p>
            </article>
            <div class="item-wrapper">
                <TokenItem data={token} variant={TokenItemVariant.NoActions}/>
            </div>
        </div>
        <div class="form--input">
            <div class="form--input-field">
                <TextField bind:value={amount}
                           invalid={!isEmptyAmount && !isValidAmount}
                           label="Donation Amount"
                />
                {#if isEmptyAmount}
                    <HelperText>Enter the amount you like to donate</HelperText>
                {:else}
                    <HelperText validationMsg>Invalid Amount</HelperText>
                {/if}
            </div>
            <span class="mdc-typography--headline6">SIGNA</span>
        </div>

        {#if isQrCodeVisible}
            <PaymentQrCode recipient={token.at}
                           costs={costs}
                           fee={$fee$}
            />
        {/if}

        <div class="form--footer">
            <Button on:click={handleCancel}>
                <Label>Back</Label>
            </Button>
        </div>
    </div>
</Page>


<style>

    .header {
        text-align: center;
        margin-bottom: 1rem;
    }

    .header img {
        height: 96px;
        width: 96px;
        text-align: center;
    }

    .form {
        display: block;
        max-width: 600px;
        margin: 0 auto
    }

    .form--header {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        margin-bottom: 2rem;
    }

    .form--header > .description {
        text-align: justify;
        width: 50%;
        margin: 0;
    }

    .form--header p {
        margin: 0.5rem 0 0;
    }

    .form--header > .item-wrapper {
        margin-left: 1rem;
        width: 50%;
    }

    .form--footer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 2rem;
    }

    .form--input {
        display: flex;
        align-items: center;
    }

    .form--input-field {
        display: block;
        width: 100%;
    }

    @media (max-width: 480px) {
        .form--header {
            flex-direction: column;
        }

        .form--header > p {
            width: 100%;
        }

        .form--header > .item-wrapper {
            margin: 1rem 0;
            width: 100%;
        }

        .form--header > .description {
            width: 100%;
        }
    }

    :global(#donation .form .mdc-text-field__input) {
        font-size: 2rem !important;
    }

    :global(.form .mdc-text-field) {
        width: 100% !important;
    }

</style>
