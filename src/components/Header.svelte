<script>
    import { goto, prefetch } from '@sapper/app'
    import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar'
    import IconButton from '@smui/icon-button'
    import { RouteOwner, RouteOwnerTokens, RouteHome } from '../utils/routes'
    import { isEmptyString } from '../utils/isEmptyString'
    import { dispatchEvent } from '../utils/dispatchEvent'
    import { account$, clearAccount } from '../routes/account/accountStore'
    import { Events } from '../utils/events'
    import { convertNumericIdToAddress } from '@burstjs/util'

    $: currentAccount = $account$.accountId
    $: hasAccount = !isEmptyString(currentAccount)

    function gotoOwnerPage() {
        if (hasAccount) {
            goto(RouteOwnerTokens(currentAccount))
        } else {
            dispatchEvent(Events.ShowAccountDialog, true)
        }
    }

    function unsetAccount() {
        clearAccount()
        goto(RouteHome())
    }

</script>

<TopAppBar variant="static" dense color='primary'>
    <Row>
        <Section>
            <IconButton class="material-icons">menu</IconButton>
            <img class="burst-logo" src="img/burst-white.svg" alt="Burst"/>
            <Title>Applications</Title>
        </Section>
        <Section align="end" toolbar>
            {#if hasAccount}
                <div class="current-account" title="Clear Account">
                    <div class="mdc-typography--body1">{convertNumericIdToAddress(currentAccount)}</div>
                    <IconButton ripple={false}
                                class="material-icons"
                                aria-label="Unset Account"
                                on:click={unsetAccount} >
                                clear
                    </IconButton>
                </div>
            {:else}
                <div title="Enter as your account">
                    <IconButton ripple={false}
                                class="material-icons"
                                aria-label="Your Account"
                                on:click={gotoOwnerPage}
                    >
                        account_box
                    </IconButton>
                </div>
            {/if}
        </Section>
    </Row>
</TopAppBar>

<style>
    .burst-logo {
        height: 48px
    }
    .current-account {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .current-account .mdc-typography--body1 {
        margin-right: 1rem;
    }
</style>
