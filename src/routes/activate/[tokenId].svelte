<script context="module">
    export async function preload({ params, query }) {
        const {tokenId} = params;
        return {tokenId}
    }
</script>

<script>
    import Activation from '../../features/account/Activation.svelte'
    import { tokens$ } from '../../features/_common/tokenStore'

    export let tokenId
    $: token = $tokens$.items.find(i => i.at === tokenId)
</script>

<Activation {token} />
