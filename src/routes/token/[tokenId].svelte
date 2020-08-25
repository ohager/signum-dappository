<script context="module">
    export async function preload({ params, query }) {
        const {tokenId} = params;
        return {tokenId}
    }
</script>

<script>
    import Activation from '../../features/account/Activation.svelte'
    import { tokens$ } from '../../features/tokens/tokenStore'
    import TokenDetail from '../../features/tokens/TokenDetail.svelte'

    export let tokenId
    $: token = $tokens$.items.find(i => i.at === tokenId)
</script>

<TokenDetail {token} />
