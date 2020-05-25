<script context="module">
    export async function preload({ params, query }) {
        const {tokenId} = params;
        return {tokenId}
    }
</script>

<script>
    import { tokens$ } from '../../features/application/applicationTokenStore'
    import Deactivation from '../../features/operations/Deactivation.svelte'

    export let tokenId
    $: token = $tokens$.items.find(i => i.at === tokenId)
</script>

<Deactivation {token} />
