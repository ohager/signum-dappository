<script context="module">
    import { Vars } from '../context'
    export async function preload({ params, query }) {
        return {isTestnet: Vars.IsTestnet === 'true'}
    }
</script>


<script>
    import { Header, Message, AccountDialog, LoadingBar, ThemeProvider } from '../features/_common'
    import LeftSideMenu from '../features/_common/LeftSideMenu.svelte'
    import { Scrim } from '@smui/drawer'
    import Stamp from '../features/_common/Stamp.svelte'

    export let segment
    // export let preload
    export let isTestnet

    let isMenuOpen = false
</script>

<ThemeProvider>
    <Header {isMenuOpen} {isTestnet} />
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
