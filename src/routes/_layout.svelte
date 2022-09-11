<script context="module">
    import { Vars } from '../context'
    export async function preload({ params, query }) {
        return {
            isTestnet: Vars.IsTestnet,
            isMaintenance: Vars.IsMaintenance
        }
    }
</script>


<script>
    import {
        Header,
        Message,
        AccountDialog,
        LoadingBar,
        ThemeProvider,
        LeftSideMenu,
        Maintenance,
        MaintenanceHeader,
    } from '../features/_common'

    export let isTestnet
    export let isMaintenance

    let isMenuOpen = false
</script>

<ThemeProvider>
    {#if isMaintenance}
        <MaintenanceHeader />
        <main>
            <Maintenance />
        </main>
    {:else}
        <Header {isMenuOpen} {isTestnet} />
        <Message/>
        <main>
            <LeftSideMenu bind:open={isMenuOpen} />
            <AccountDialog/>
            <slot/>
        </main>
    {/if}
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
