<script>
    import QrCode from 'qrcode'
    import { beforeUpdate, onMount } from 'svelte'
    import { goto } from '@sapper/app'
    import TextField from '@smui/textfield'
    import HelperText from '@smui/textfield/helper-text/index'
    import Page from '../../components/Page.svelte'
    import {
        convertNumberToNQTString,
        convertNumericIdToAddress,
        convertNQTStringToNumber,
        createDeeplink,
    } from '@burstjs/util'
    import { BurstApi } from '../../utils/burstApi'

    export let token = {
        at: '',
        name: '',
        img: '',
    }

    const AmountValidationPattern = /^[1-9]\d*$/

    let amount = ''
    let QrCodeCanvas = null
    let suggestedFeePlanck = null
    let info = []
    let ActivationCostsPlanck = convertNumberToNQTString(100) // todo get from contract

    $: isValidAmount = AmountValidationPattern.test(amount)
    $: isEmptyAmount = amount.length === 0
    $: isQrCodeVisible = QrCodeCanvas && !isEmptyAmount && isValidAmount

    function mountDeepLink(amount, cip22 = false) {
        const amountPlanck = calculateTotalAmountPlanck(amount)
        const address = convertNumericIdToAddress(token.at)
        return cip22 ? createDeeplink({
            domain: 'payment',
            action: 'send',
            payload: {
                amountPlanck,
                receiver: address,
                feePlanck: suggestedFeePlanck,
                immutable: false,
            },
        }) : `burst://requestBurst?receiver=${address}&amountNQT=${amountPlanck}&feeNQT=${suggestedFeePlanck}&immutable=false`
    }


    function calculateTotalAmountPlanck(amount, withFee = false) {
        const amountPlanck = convertNumberToNQTString(amount || 0)
        let totalPlanck = BigInt(amountPlanck) + BigInt(ActivationCostsPlanck)
        if (withFee) {
            totalPlanck += BigInt(suggestedFeePlanck)
        }
        return totalPlanck.toString(10)
    }

    function mountInfo(amount) {
        const info = []
        info.push(['Recipient:', convertNumericIdToAddress(token.at)])
        info.push(['Donation:', amount])
        info.push(['Activation Costs:', `${convertNQTStringToNumber(ActivationCostsPlanck)} (will be entirely reimbursed)`])
        info.push(['Fee:', convertNQTStringToNumber(suggestedFeePlanck)])
        info.push(['---', ''])
        info.push(['Total:', `${convertNQTStringToNumber(calculateTotalAmountPlanck(amount, true))} BURST`])
        return info
    }

    function openDeepLink() {
        console.log(mountDeepLink(amount, true))
        goto(mountDeepLink(amount))
    }

    onMount(async () => {
        const fees = await BurstApi.network.suggestFee()
        suggestedFeePlanck = fees.standard
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
        .donation {
            max-width: 100%;
        }

        .donation__form--qrcode {
            flex-direction: column;
        }

        .donation__form--qrcode > section > ul {
            text-align: center;
        }
    }


    :global(.mdc-text-field__input) {
        font-size: 2rem !important;
    }

    :global(.mdc-text-field) {
        width: 100% !important;
    }

</style>

<Page>
    <div class="donation__header">
        <img src="/img/donation.svg" alt="donate">
    </div>
    <div class="donation__form">
        <div class="donation__form--header">
            <img src={token.img} alt={`${token.name}-logo`}>
            <h4 class="mdc-typography--headline4">
                {token.name}
            </h4>
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
    </div>
</Page>
