<script>
  import Button, {Label} from '@smui/button'
  import QrCode from 'qrcode'
  import {mountDeepLink} from '../../utils/deeplink'
  import {assureAccountId} from '../../utils/assureAccountId'
  import {dispatchEvent} from '../../utils/dispatchEvent'
  import {theme$} from './appStore'
  import {ThemeNames} from '../../utils/themeNames'
  import {convertNumericIdToAddress} from "./convertNumericIdToAddress";
  import {Amount, FeeQuantPlanck} from "@signumjs/util";
  import {xtWallet$} from "./xtWalletStore";
  import {Events} from "../../utils/events";
  import Link from "./Link.svelte";
  import {getXtWalletLink} from "../../utils/getXtWalletLink";
  import {ledgerService} from "../../services/ledgerService";

  export let recipient = ""
  export let costs = []
  export let fee = Amount.fromPlanck(FeeQuantPlanck.toString())
  export let message = null

  let info = []
  let QrCodeCanvas = null
  let walletOpen = false

  $: wallet = $xtWallet$.wallet
  $: totalCosts = costs.reduce((sum, [_, value]) => sum.add(value), Amount.fromSigna(0))
  $: {
    info = []
    const recipientAddress = convertNumericIdToAddress(assureAccountId(recipient))
    info.push(['Recipient:', recipientAddress])
    info.push(...costs)
    info.push(['Fee:', fee])
    info.push(['---', ''])
    info.push(['Total:', Amount.fromSigna(totalCosts.getSigna()).add(fee)])
  }

  $: deepLink = mountDeepLink(recipient, totalCosts, fee, message)

  $: {
    if (QrCodeCanvas !== null) {
      QrCode.toCanvas(QrCodeCanvas, deepLink, {
        width: 256,
        color: {
          light: $theme$ === ThemeNames.Dark ? '#323f65ff' : '#ffffffff',
          dark: $theme$ === ThemeNames.Dark ? '#b2b2d4ff' : '#001e35ff',
        },
      })
    }
  }

  async function payNow() {
    if (wallet) {
      await payWithXtWallet()
    } else {
      openDeeplink()
    }
  }

  async function payWithXtWallet() {
    walletOpen = true
    try {
      const {unsignedTransactionBytes} = await ledgerService.client.transaction.sendAmountToSingleRecipient({
        senderPublicKey: wallet.connection.publicKey,
        feePlanck: fee.getPlanck(),
        amountPlanck: totalCosts.getPlanck(),
        recipientId: recipient
      })
      await wallet.confirm(unsignedTransactionBytes)
      dispatchEvent(Events.Success, "Transaction successfully transmitted")
    } catch (e) {
      dispatchEvent(Events.Error, "Transaction not sent")
    } finally {
      walletOpen = false
    }

  }

  function openDeeplink() {
    window.open(deepLink, '_blank')
  }

</script>

<div class="form--qrcode">
    <a href={deepLink}>
        <canvas bind:this={QrCodeCanvas}></canvas>
    </a>
    <section>
        <p>
            Scan the code with a QR-Code scanner,
            or click [PAY] button, to open a wallet
        </p>

        <ul>
            {#each info as [label, value]}
                <li class="form--qrcode-infoitem">
                    { `${label} ${value}` }</li>
            {/each}
        </ul>


        <div class="paynow">
            <Button on:click={payNow} disabled={walletOpen}>
                <Label>{wallet ? "Pay with XT wallet" : "Pay via Deeplink"}</Label>
            </Button>
            {#if !wallet}
                <p>Or connect to
                    <Link inline href={getXtWalletLink()} target="_blank">XT Wallet</Link>
                </p>
            {/if}
        </div>

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

    .form--qrcode > section > .paynow {
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .form--qrcode-infoitem {
        list-style: none;
    }

    @media (max-width: 480px) {

        .form--qrcode {
            flex-direction: column;
        }

        .form--qrcode > section {
            text-align: center;
        }
    }


</style>
