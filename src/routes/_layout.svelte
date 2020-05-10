<script>
    import Header from '../components/Header.svelte'
    import Message from '../components/Message.svelte'
    import AccountDialog from '../components/AccountDialog.svelte'

</script>

<Header/>
<Message/>
<AccountDialog/>

<main>
    <slot/>
</main>


<style>

    :global(body) {
        margin: 0;
    }

    main {
        position: relative;
        background-color: white;
        padding: 1em;
        margin: 0 auto;
        box-sizing: border-box;
    }

    @media (max-width: 480px) {
        main {
            padding: 0;
        }
    }

</style>
