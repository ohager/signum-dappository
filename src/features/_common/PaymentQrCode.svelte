<script>
    import QrCode from 'qrcode'
    import { BurstValue, convertNumericIdToAddress, FeeQuantPlanck } from '@burstjs/util'
    import { mountLegacyDeepLink } from '../../utils/deeplink'
    import { assureAccountId } from '../../utils/assureAccountId'
    import { theme$ } from './appStore'
    import { ThemeNames } from '../../utils/themeNames'

    export let recipient
    export let costs = []
    export let fee = BurstValue.fromPlanck(FeeQuantPlanck.toString())
    export let message = null

    let info = []
    let QrCodeCanvas = null

    $: totalCosts = costs.reduce((sum, [_, value]) => sum.add(value), BurstValue.fromBurst(0))
    $: {
        info = []
        const recipientAddress = convertNumericIdToAddress(assureAccountId(recipient))
        info.push(['Recipient:', recipientAddress])
        info.push(...costs)
        info.push(['Fee:', fee])
        info.push(['---', ''])
        info.push(['Total:', BurstValue.fromBurst(totalCosts.getBurst()).add(fee)])
    }

    $: deepLink =  mountLegacyDeepLink(recipient, totalCosts, fee, message)

    $: {
        if (QrCodeCanvas !== null) {
            QrCode.toCanvas(QrCodeCanvas, deepLink, {
                width: 256,
                color : {
                    light: $theme$ === ThemeNames.Dark ? '#323f65ff' : '#ffffffff',
                    dark: $theme$ === ThemeNames.Dark ? '#b2b2d4ff' : '#001e35ff'
                }
            })
        }
    }

</script>

<div class="form--qrcode">
    <a href={deepLink}>
        <canvas bind:this={QrCodeCanvas}/>
    </a>
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

<style>
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

        .form--qrcode {
            flex-direction: column;
        }

        .form--qrcode > section > ul {
            text-align: center;
        }
    }

</style>
