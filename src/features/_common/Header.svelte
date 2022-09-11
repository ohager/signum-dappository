<script>
  import {fade} from 'svelte/transition'
  import {goto} from '@sapper/app'
  import Button, {Label} from '@smui/button'
  import TopAppBar, {Row, Section, Title} from '@smui/top-app-bar'
  import IconButton from '@smui/icon-button'
  import {RouteAccountTokens, RouteHome} from '../../utils/routes'
  import {isEmptyString} from '../../utils/isEmptyString'
  import {dispatchEvent} from '../../utils/dispatchEvent'
  import {account$} from './accountStore'
  import {Events} from '../../utils/events'
  import SyncProgressBar from '../../features/tokens/SyncProgressBar.svelte'
  import Logo from './Logo.svelte'
  import Stamp from './Stamp.svelte'
  import LoadingBar from './LoadingBar.svelte'
  import {convertNumericIdToAddress} from "./convertNumericIdToAddress";
  import {connectXtWallet, xtWallet$} from "./xtWalletStore";
  import {isMobile} from "../../utils/isMobile";

  export let isMenuOpen = false
  export let isTestnet = false

  $: wallet = $xtWallet$.wallet
  $: currentAccount = $account$.accountId
  $: hasAccount = !isEmptyString(currentAccount)


  function gotoOwnerPage() {
    if (hasAccount) {
      goto(RouteAccountTokens(currentAccount))
    } else {
      dispatchEvent(Events.ShowAccountDialog, {isVisible: true})
    }
  }

  function toggleMenu() {
    dispatchEvent(Events.ShowMenu, {isOpen: !isMenuOpen})
  }

  function gotoHome() {
    goto(RouteHome())
  }

</script>

<TopAppBar variant="fixed" dense color='primary'>
    <Row>
        <Section>
            <div class="menu-icon-wrapper">
                {#if isMenuOpen}
                    <div transition:fade class="menu-icon">
                        <IconButton class="material-icons" on:click={toggleMenu}>menu_open</IconButton>
                    </div>
                {:else}
                    <div transition:fade class="menu-icon">
                        <IconButton class="material-icons" on:click={toggleMenu}>menu</IconButton>
                    </div>
                {/if}
            </div>
            <div class="logo" on:click={gotoHome}>
                <Logo height="42px" dark/>
                <div class="title-text">
                    <Title>The Signum DAppository</Title>
                </div>
            </div>
        </Section>
        <Section align="end" toolbar>
            {#if hasAccount}
                <div class="current-account">
                    <Button title="Goto Account Page"
                            on:click={gotoOwnerPage}
                    >
                        <Label style="color: white">{convertNumericIdToAddress(currentAccount)}</Label>
                    </Button>
                </div>
            {/if}
            {#if !isMobile()}
                {#if wallet}
                    <div class="current-account">
                        <img src="/img/signum-xt-logo.svg" height="24" alt="XT Wallet Connected"
                             title="XT Wallet Connected" role="img"/>
                    </div>
                {:else}
                    <div class="current-account">
                        <Button title="Connect XT Wallet" on:click={connectXtWallet}>
                            <Label style="color: white">Connect XT Wallet</Label>
                        </Button>
                    </div>
                {/if}
            {/if}
        </Section>
    </Row>
    <SyncProgressBar/>
    <LoadingBar/>
    {#if isTestnet }
        <div class="testnet-marker">
            <Stamp text="testnet"/>
        </div>
    {/if}
</TopAppBar>

<style>

    :global(.mdc-top-app-bar) {
        box-shadow: var(--box-shadow);
    }

    @media (max-width: 480px) {
        .title-text {
            display: none;
        }
    }

    .logo {
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: 0 0.5rem;
        transition: none;
    }

    .logo:hover {
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
        transition: none;
    }

    .current-account {
        display: flex;
        flex-direction: row;
        align-items: center;
        color: white !important;
    }

    .menu-icon-wrapper {
        position: relative;
        height: 48px;
        width: 48px;
    }

    :global(.menu-icon-wrapper .menu-icon > .mdc-icon-button) {
        position: absolute;
        color: white !important;
    }

    .testnet-marker {
        position: absolute;
        bottom: 1rem;
        z-index: 100;
        pointer-events: none;
        left: calc(50% - 80px);
        top: 16px;
    }

</style>
