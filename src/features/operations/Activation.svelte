<script>
    import QrCode from 'qrcode'
    import { beforeUpdate, onMount } from 'svelte'
    import { goto } from '@sapper/app'
    import Button, { Label } from '@smui/button'
    import Page from '../../components/Page.svelte'
    import { convertNumericIdToAddress } from '@burstjs/util'
    import ApplicationItem from '../application/list/ApplicationItem.svelte'
    import { ApplicationItemVariant } from '../application/list/constants'
    import { mountLegacyDeepLink } from '../../utils/deeplink'
    import { TokenContract } from '../../services/tokenContract'
    import { EmptyToken } from '../../utils/emptyToken'
    import { burstFee$ } from '../burstFeeStore'
    import { BurstValue } from '@burstjs/util'

    export let token = EmptyToken

    const amount = BurstValue.fromBurst(TokenContract.ActivationCosts)

    let QrCodeCanvas = null
    let suggestedFee = $burstFee$
    let info = []

    $: address = token.at
    $: info = mountInfo(address)
    $: {
        if (QrCodeCanvas !== null) {
            QrCode.toCanvas(QrCodeCanvas, generateDeepLink(), {
                width: 256,
            })
        }
    }

    function generateDeepLink() {
        return mountLegacyDeepLink(
                token.at,
                amount,
                suggestedFee,
        )
    }

    function mountInfo(recipient) {
        const info = []

        const total = BurstValue.fromBurst(TokenContract.ActivationCosts).add(suggestedFee)
        info.push(['Recipient:', convertNumericIdToAddress(recipient)])
        info.push(['Activation Fee:', amount])
        info.push(['Fee:', suggestedFee])
        info.push(['---', ''])
        info.push(['Total:', total])
        return info
    }

    function handleCancel() {
        history.back()
    }

    function openDeepLink() {
        goto(generateDeepLink())
    }
</script>


<Page>
    <div class="header">
        <img src="/img/activation.svg" alt="activate">
    </div>
    <div class="form">
        <div class="form--header">
            <div class="item-wrapper">
                <ApplicationItem data={token} variant={ApplicationItemVariant.NoActions}/>
            </div>
            <p class="mdc-typography--body1">
                Before you can receive your first donations, the token must first be activated. Unfortunately there is a small fee for this, but it is not too much. Mind that the activation may take a few moments. Good luck with your app.
            </p>
        </div>

        <div class="form--qrcode">
            <canvas bind:this={QrCodeCanvas} on:click={openDeepLink}/>
            <section>
                <p>
                    Scan the code with e.g. Phoenix Mobile Wallet,
                    or tap/click the QR Code to open an installed wallet
                </p>

                <ul>
                    {#each info as [label, value]}
                        <li class="form--qrcode-infoitem">
                            { `${label} ${value}` }</li>
                    {/each}
                </ul>
            </section>
        </div>
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

    .form--header > p {
        text-align: justify;
        width: 50%;
        margin: 0;
    }

    .form--header > .item-wrapper {
        margin-right: 1rem;
        width: 50%;
    }

    .form--header img {
        height: 64px;
        width: 64px;
        padding-right: 1rem;
    }

    .form--footer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 2rem;
    }

    .form--qrcode {
        text-align: center;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .form--qrcode > canvas {
        cursor: pointer;
    }

    .form--qrcode > section {
        text-align: justify;
        font-size: 0.75rem;
        font-family: sans-serif;
        color: gray;
        line-height: 1rem;
    }

    .form--qrcode > section > ul {
        margin: 0;
        padding: 0;
    }

    .form--qrcode-infoitem {
        list-style: none;
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

        .form--qrcode {
            flex-direction: column;
        }

        .form--qrcode > section > ul {
            text-align: center;
        }
    }

    :global(.form .mdc-text-field__input) {
        font-size: 2rem !important;
    }

    :global(.form .mdc-text-field) {
        width: 100% !important;
    }

</style>
