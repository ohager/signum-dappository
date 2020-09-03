<script context="module">
    export async function preload({ params, query }) {
        const {tokenId} = params;
        return {tokenId}
    }
</script>

<script>
    import { tokens$ } from '../../features/_common/tokenStore'
    import Deactivation from '../../features/account/Deactivation.svelte'

    export let tokenId
    $: token = $tokens$.items.find(i => i.at === tokenId)
</script>

<Deactivation {token} />
