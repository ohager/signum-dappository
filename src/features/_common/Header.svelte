<script>
    import {fade} from 'svelte/transition'
    import { goto, prefetch } from '@sapper/app'
    import Button, { Label } from '@smui/button'
    import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar'
    import IconButton from '@smui/icon-button'
    import { RouteAccountTokens, RouteHome } from '../../utils/routes'
    import {rotate} from '../../utils/transitionRotate'
    import { isEmptyString } from '../../utils/isEmptyString'
    import { dispatchEvent } from '../../utils/dispatchEvent'
    import { account$, clearAccount } from './accountStore'
    import { Events } from '../../utils/events'
    import { convertNumericIdToAddress } from '@burstjs/util'
    import SyncProgressBar from '../../features/tokens/SyncProgressBar.svelte'

    export let isMenuOpen = false

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
            <img class="burst-logo" src="img/burst-white.svg" alt="Burst"/>
            <Title>Applications</Title>
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
</TopAppBar>

<style>
    .burst-logo {
        height: 42px
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

    .menu-icon-wrapper .menu-icon {
        position: absolute;
    }

</style>
