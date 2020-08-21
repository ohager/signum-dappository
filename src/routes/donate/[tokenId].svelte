<script context="module">
    export async function preload({ params, query }) {
        const { tokenId } = params
        return { tokenId }
    }
</script>

<script>
    import Donation from '../../features/tokens/Donation.svelte'
    import { tokens$ } from '../../features/tokens/tokenStore'

    export let tokenId

    $: token = $tokens$.items.find(i => i.at === tokenId)
</script>

<Donation {token}/>

