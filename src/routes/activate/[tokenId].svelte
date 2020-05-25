<script context="module">
    export async function preload({ params, query }) {
        const {tokenId} = params;
        return {tokenId}
    }
</script>

<script>
    import Activation from '../../features/operations/Activation.svelte'
    import { tokens$ } from '../../features/application/applicationTokenStore'

    export let tokenId
    $: token = $tokens$.items.find(i => i.at === tokenId)
</script>

<Activation {token} />
