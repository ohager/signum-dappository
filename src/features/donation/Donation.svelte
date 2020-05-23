<script>
    import QrCode from 'qrcode'
    import { beforeUpdate, onMount } from 'svelte'
    import { goto } from '@sapper/app'
    import TextField from '@smui/textfield'
    import HelperText from '@smui/textfield/helper-text/index'
    import Button, { Label } from '@smui/button'
    import Page from '../../components/Page.svelte'
    import {
        BurstValue,
        convertNumericIdToAddress,
        createDeeplink,
    } from '@burstjs/util'
    import { BurstApi } from '../../utils/burstApi'
    import { RouteHome } from '../../utils/routes'
    import ApplicationItem from '../application/list/ApplicationItem.svelte'
    import { ApplicationItemVariant } from '../application/list/constants'

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

    const AmountValidationPattern = /^[1-9]\d*$/

    let amount = ''
    let QrCodeCanvas = null
    let suggestedFee = BurstValue.fromBurst(0.05) // make dynamic
    let info = []
    let ActivationCosts = BurstValue.fromBurst(100) // todo get from contract

    $: isValidAmount = AmountValidationPattern.test(amount)
    $: isEmptyAmount = amount.length === 0
    $: isQrCodeVisible = QrCodeCanvas && !isEmptyAmount && isValidAmount

    function mountDeepLink(amount, cip22 = false) {
        const amountPlanck = calculateTotalAmount(amount).getPlanck()
        const feePlanck = suggestedFee.getPlanck()
        const address = convertNumericIdToAddress(token.at)
        return cip22 ? createDeeplink({
            domain: 'payment',
            action: 'send',
            payload: {
                amountPlanck,
                receiver: address,
                feePlanck,
                immutable: false,
            },
        }) : `burst://requestBurst?receiver=${address}&amountNQT=${amountPlanck}&feeNQT=${suggestedFee}&immutable=false`
    }


    function calculateTotalAmount(amount, withFee = false) {
        return BurstValue
                .fromBurst(amount || 0)
                .add(ActivationCosts)
                .add(withFee ? suggestedFee : BurstValue.fromBurst(0))
    }

    function mountInfo(amount) {
        const info = []
        info.push(['Recipient:', convertNumericIdToAddress(token.at)])
        info.push(['Donation:', amount])
        info.push(['Activation Costs:', `${ActivationCosts.getBurst()} (will be entirely reimbursed)`])
        info.push(['Fee:', suggestedFee.getBurst()])
        info.push(['---', ''])
        info.push(['Total:', `${calculateTotalAmount(amount, true).getBurst()} BURST`])
        return info
    }

    function handleCancel() {
        goto(RouteHome())
    }

    function openDeepLink() {
        goto(mountDeepLink(amount))
    }

    onMount(async () => {
        const fees = await BurstApi.network.suggestFee()
        suggestedFee = BurstValue.fromPlanck(fees.standard.toString(10))
    })


    beforeUpdate(() => {
        if (isEmptyAmount && QrCodeCanvas) {
            const context = QrCodeCanvas.getContext('2d')
            context.clearRect(0, 0, QrCodeCanvas.width, QrCodeCanvas.height)
            QrCodeCanvas.style.height = 0
            QrCodeCanvas.style.width = 0
        }

        if (!isQrCodeVisible) {
            return
        }

        QrCode.toCanvas(QrCodeCanvas, mountDeepLink(amount), {
            width: 256,
        })
        info = mountInfo(amount)
    })

</script>


<Page>
    <div class="donation__header">
        <img src="/img/donation.svg" alt="donate">
    </div>
    <div class="donation__form">
        <div class="donation__form--header">
            <div class="item-wrapper">
                <ApplicationItem data={token} variant={ApplicationItemVariant.NoActions}/>
            </div>
            <p class="mdc-typography--body1">
                Great Attitude. Donating not only helps the project itself and fills the owner with pride through the experienced recognition, but also helps the Burst community. Thank you very much for your support.
            </p>
        </div>
        <div class="donation__form--input">
            <div class="donation__form--input-field">
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
            <span class="mdc-typography--headline6">BURST</span>
        </div>
        <div class="donation__form--qrcode">
            <canvas bind:this={QrCodeCanvas} on:click={openDeepLink}/>
            {#if isQrCodeVisible}
                <section>
                    <p>
                        Scan the code with e.g. Phoenix Mobile Wallet,
                        or tap/click the QR Code to open an installed wallet
                    </p>

                    <ul>
                        {#each info as [label, value]}
                            <li class="donation__form--qrcode-infoitem">
                                { `${label} ${value}` }</li>
                        {/each}
                    </ul>
                </section>
            {/if}
        </div>
        <div class="donation__form--footer">
            <Button on:click={handleCancel}>
                <Label>Back</Label>
            </Button>
        </div>
    </div>
</Page>


<style>

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
        align-items: flex-start;
        margin-bottom: 2rem;
    }

    .donation__form--header > p {
        width: 50%;
        margin: 0;
    }

    .donation__form--header > .item-wrapper {
        margin-right: 1rem;
        width: 50%;
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
