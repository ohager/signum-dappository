<script>
    import { goto, prefetch } from '@sapper/app'
    import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar'
    import IconButton from '@smui/icon-button'
    import { RouteOwner, RouteOwnerTokens } from '../utils/routes'
    import { isEmptyString } from '../utils/isEmptyString'
    import { dispatchEvent } from '../utils/dispatchEvent'
    import { account$ } from '../stores/accountStore'
    import { Events } from '../utils/events'

    $: currentAccount = $account$.accountId
    $: hasAccount = !isEmptyString(currentAccount)

    function gotoOwnerPage() {
        if (hasAccount) {
            goto(RouteOwnerTokens(currentAccount))
        } else {
            dispatchEvent(Events.ShowAccountDialog, true)
        }
    }

</script>

<style>
    .burst-logo {
        height: 48px
    }
</style>

<TopAppBar variant="static" dense color='primary'>
    <Row>
        <Section>
            <IconButton class="material-icons">menu</IconButton>
            <img class="burst-logo" src="img/burst-white.svg" alt="Burst"/>
            <Title>Applications</Title>
        </Section>
        <Section align="end" toolbar>
            {#if hasAccount}
                <div class="account-address">{currentAccount}</div>
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
