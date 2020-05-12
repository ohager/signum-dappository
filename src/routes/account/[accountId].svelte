<script context="module">
    export async function preload({ params }) {
        const { accountId } = params
        return { accountId }
    }
</script>

<script>
    import OwnApplicationsList from '../../features/application/list/OwnApplicationsList.svelte'

    export let accountId
</script>

<OwnApplicationsList {accountId}/>
