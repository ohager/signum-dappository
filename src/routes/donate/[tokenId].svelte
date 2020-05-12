<script context="module">
    export async function preload({ params, query }) {
        const {tokenId} = params;
        return {tokenId}
    }
</script>

<script>
    import Donation from '../../features/donation/Donation.svelte'
    import { tokens$ } from '../../features/application/list/applicationTokenStore'
    import { beforeUpdate } from 'svelte'
    export let tokenId

    $: token = $tokens$.items.find( i => i.at === tokenId)
</script>

<Donation {token} />

