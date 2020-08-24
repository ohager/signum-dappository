<script>
    import {Header, Message, AccountDialog, LoadingBar} from '../features/_common'

    export let segment
</script>

<Header/>
<Message/>
<AccountDialog/>
<main>
    <LoadingBar/>
    <slot/>
</main>


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

    html {
        background-color: #eee;
    }

    main {
        position: relative;
        padding: 1em;
        margin: 0 auto;
        box-sizing: border-box;
        height: calc(100vh - var(--header-height));
        top: var(--header-height);
        overflow: auto;
    }

    @media (max-width: 480px) {
        main {
            padding: 0;
        }
    }

</style>
