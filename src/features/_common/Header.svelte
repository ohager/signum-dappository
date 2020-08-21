<script>
    import { goto, prefetch } from '@sapper/app'
    import Button, { Label } from '@smui/button'
    import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar'
    import IconButton from '@smui/icon-button'
    import { RouteAccountTokens, RouteHome } from '../../utils/routes'
    import { isEmptyString } from '../../utils/isEmptyString'
    import { dispatchEvent } from '../../utils/dispatchEvent'
    import { account$, clearAccount } from '../account/accountStore'
    import { Events } from '../../utils/events'
    import { convertNumericIdToAddress } from '@burstjs/util'

    $: currentAccount = $account$.accountId
    $: hasAccount = !isEmptyString(currentAccount)

    function gotoOwnerPage() {
        if (hasAccount) {
            goto(RouteAccountTokens(currentAccount))
        } else {
            dispatchEvent(Events.ShowAccountDialog, { isVisible: true })
        }
    }

    function gotoHomePage() {
        goto(RouteHome())
    }

    function unsetAccount() {
        clearAccount()
        goto(RouteHome())
    }

</script>

<TopAppBar variant="fixed" dense color='primary'>
    <Row>
        <Section>
            <IconButton class="material-icons" on:click={gotoHomePage}>home</IconButton>
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
                    <IconButton ripple={false}
                                class="material-icons"
                                aria-label="Unset Account"
                                title="Unset Account"
                                on:click={unsetAccount}>
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
</style>
