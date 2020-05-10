<script context="module">
    export async function preload({ params, query }) {
        const {ownerId} = params;
        return {ownerId}
    }
</script>

<script>
    import OwnApplicationsList from '../../features/application/list/OwnApplicationsList.svelte'
    export let ownerId
</script>

<OwnApplicationsList {ownerId} />
