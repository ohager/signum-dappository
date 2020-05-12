<script context="module">
    export async function preload({ params, query }) {
        const { accountId } = params
        console.log('query', query)
        return { accountId }
    }
</script>

<script>
    import AccountApplicationsList from '../../features/application/list/AccountApplicationsList.svelte'
    import RegisterFabButton from '../../components/RegisterFabButton.svelte'


    function handleClick() {
    }

    const prefetchRoute = () => {
    }


    export let accountId
</script>

<div>
    <AccountApplicationsList {accountId}/>
    <RegisterFabButton on:mouseenter={prefetchRoute} on:click={handleClick}/>
</div>
