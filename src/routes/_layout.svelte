<script>
    import { Header, Message, AccountDialog, LoadingBar, ThemeProvider } from '../features/_common'
    import LeftSideMenu from '../features/_common/LeftSideMenu.svelte'
    import { Scrim } from '@smui/drawer'

    export let segment
    export let preload

    let isMenuOpen = false
</script>

<ThemeProvider>
    <Header {isMenuOpen} />
    <Message/>
    <main>
        <LeftSideMenu bind:open={isMenuOpen} />
        <LoadingBar/>
        <AccountDialog/>
        <slot/>
    </main>
</ThemeProvider>


<style>
    :global(body) {
        margin: 0;
        overflow: hidden;
    }

    :global(.mdc-top-app-bar){
        z-index: 100 !important;
    }

    :global(*::-webkit-scrollbar) {
        width: 0.25rem;
    }

    :global(*::-webkit-scrollbar-thumb) {
        background-color: darkgrey;
    }

    :global(*){
        scrollbar-color: darkgrey white;
        scrollbar-width: thin;
    }

    main {
        position: relative;
        margin: 0 auto;
        box-sizing: border-box;
        height: calc(100vh - var(--header-height));
        top: var(--header-height);
        overflow: auto;
    }
</style>
