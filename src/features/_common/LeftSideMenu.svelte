<script>
    import { goto, prefetch } from '@sapper/app'
    import Drawer, {AppContent, Content, Header, Title, Subtitle, Scrim} from '@smui/drawer';
    import List, {Item, Text, Graphic, Separator, Subheader} from '@smui/list';
    import Switch from '@smui/switch';
    import FormField from '@smui/form-field';
    import { account$, clearAccount } from './accountStore'
    import { setTheme, theme$ } from './appStore'
    import { isEmptyString } from '../../utils/isEmptyString'
    import { RouteAbout, RouteAccountTokens, RouteHome, RouteTutorial } from '../../utils/routes'
    import { Events } from '../../utils/events'
    import { dispatchEvent } from '../../utils/dispatchEvent'
    import { ThemeNames } from '../../utils/themeNames'

    let drawerElement
    export let open = false
    let active

    const ItemNames = {
        EnterAccountZone: 'enter-account-zone',
        LeaveAccountZone: 'leave-account-zone',
        Tutorial: 'tutorial',
        About: 'about',
        Home: 'home',
    }

    $: currentAccount = $account$.accountId
    $: hasAccount = !isEmptyString(currentAccount)
    $: darkThemeChecked = $theme$ === ThemeNames.Dark
    $: {
           setTheme(darkThemeChecked ? ThemeNames.Dark : ThemeNames.Default)
    }


    function showDrawer({detail}) {
        open = detail.isOpen
    }

    function closeDrawer() {
        open = false
    }

    function routeTo(route){
        closeDrawer()
        goto(route)
    }

    function leaveAccountZone() {
        active = ItemNames.LeaveAccountZone
        clearAccount()
        routeTo(RouteHome())
    }

    function enterAccountZone() {
        active = ItemNames.EnterAccountZone
        if (hasAccount) {
            routeTo(RouteAccountTokens(currentAccount))
        } else {
            closeDrawer()
            dispatchEvent(Events.ShowAccountDialog, { isVisible: true })
        }
    }

    function gotoTutorial() {
        routeTo(RouteTutorial())
    }

    function gotoAbout() {
        routeTo(RouteAbout())
    }

    function gotoHome() {
        routeTo(RouteHome())
    }

    function prefetchTutorial() {
        prefetch(RouteTutorial())
    }

    function prefetchAbout() {
        prefetch(RouteAbout())
    }

</script>

<svelte:window on:show-menu={showDrawer}/>

<Drawer variant="modal" bind:this={drawerElement} bind:open={open}>
    <Header>
        <Title>The Signum dAppository</Title>
        <Subtitle>All the Signum Apps in one place</Subtitle>
        <div class="theme-switch">
            <FormField>
                <Switch bind:checked={darkThemeChecked}/>
                <span slot="label">{darkThemeChecked ? 'Switch to Light Theme' : 'Switch to Dark Theme'}</span>
            </FormField>
        </div>
    </Header>
    <Content>
        <List>
            <Item on:click={gotoHome}
                  activated={active === ItemNames.Home}>
                <Graphic class="material-icons" aria-hidden="true">home</Graphic>
                <Text>Home</Text>
            </Item>
            {#if hasAccount}
                <Item on:click={leaveAccountZone}
                      activated={active === ItemNames.LeaveAccountZone}
                >
                    <Graphic class="material-icons" aria-hidden="true">clear</Graphic>
                    <Text>Leave Account Zone</Text>
                </Item>
            {:else}
                <Item on:click={enterAccountZone}
                      activated={active === ItemNames.EnterAccountZone}
                >
                    <Graphic class="material-icons" aria-hidden="true">admin_panel_settings</Graphic>
                    <Text>Enter Account Zone</Text>
                </Item>
            {/if}
            <Item on:click={gotoTutorial}
                  on:mouseenter={prefetchTutorial}
                  activated={active === ItemNames.Tutorial}>
                <Graphic class="material-icons" aria-hidden="true">tour</Graphic>
                <Text>Tutorial</Text>
            </Item>
            <Item on:click={gotoAbout}
                  on:mouseenter={prefetchAbout}
                  activated={active === ItemNames.About}>
                <Graphic class="material-icons" aria-hidden="true">contact_support</Graphic>
                <Text>About</Text>
            </Item>
        </List>
    </Content>
</Drawer>
<Scrim />


<style>
    .theme-switch {
        margin: 1rem 0 0.5rem 0 !important;
    }

</style>
