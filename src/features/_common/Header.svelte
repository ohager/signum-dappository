<script>
    import { fade } from 'svelte/transition'
    import { goto, prefetch } from '@sapper/app'
    import Button, { Label } from '@smui/button'
    import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar'
    import IconButton from '@smui/icon-button'
    import { RouteAccountTokens, RouteHome } from '../../utils/routes'
    import { isEmptyString } from '../../utils/isEmptyString'
    import { dispatchEvent } from '../../utils/dispatchEvent'
    import { account$, clearAccount } from './accountStore'
    import { Events } from '../../utils/events'
    import { convertNumericIdToAddress } from '@burstjs/util'
    import SyncProgressBar from '../../features/tokens/SyncProgressBar.svelte'
    import Logo from './Logo.svelte'
    import Stamp from './Stamp.svelte'
    import LoadingBar from './LoadingBar.svelte'

    export let isMenuOpen = false
    export let isTestnet = false

    $: currentAccount = $account$.accountId
    $: hasAccount = !isEmptyString(currentAccount)

    function gotoOwnerPage() {
        if (hasAccount) {
            goto(RouteAccountTokens(currentAccount))
        } else {
            dispatchEvent(Events.ShowAccountDialog, { isVisible: true })
        }
    }

    function toggleMenu() {
        dispatchEvent(Events.ShowMenu, { isOpen: !isMenuOpen })
    }

    function unsetAccount() {
        clearAccount()
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
            <Logo height="42px" />
            <div class="title-text">
                <Title>The Burst dAppository</Title>
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

    :global(.mdc-top-app-bar){
        box-shadow: var(--box-shadow);
    }

    @media (max-width: 480px) {
        .title-text {
            display: none;
        }
    }

    .current-account {
        display: flex;
        flex-direction: row;
        align-items: center;
        color: white !important;
    }

    .current-account .mdc-typography--body1 {
        margin-right: 1rem;
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
