<script>
    import Header from '../components/Header.svelte'
    import Message from '../components/Message.svelte'
    import AccountDialog from '../components/AccountDialog.svelte'
    import SyncProgressBar from '../features/application/tokenSync/SyncProgressBar.svelte'
</script>

<Header/>
<Message/>
<AccountDialog/>
<main>
    <SyncProgressBar/>
    <slot/>
</main>


<style>
    :global(body) {
        margin: 0;
    }

    html {
        background-color: #eee;
    }

    main {
        position: relative;
        padding: 1em;
        margin: 0 auto;
        box-sizing: border-box;
        height: fit-content;
        top: 48px;
    }

    @media (max-width: 480px) {
        main {
            padding: 0;
        }
    }

</style>
