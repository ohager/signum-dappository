<script context="module">
    import { BurstApi } from '../../context'
    import { ApplicationToken } from '../../services/repositories/models/applicationToken'

    export async function preload({ params, query }) {
        const {tokenId} = params;

        const contract = await BurstApi.contract.getContract(tokenId)
        const tokenData = ApplicationToken.mapFromContract(contract)
        return {tokenId, tokenData}
    }
</script>


<script>
    import { tokens$ } from '../../features/_common/tokenStore'
    import TokenDetail from '../../features/tokens/TokenDetail.svelte'

    export let tokenId
    export let tokenData
    $: token = $tokens$.items.find(i => i.at === tokenId)
</script>

<svelte:head>
    <!-- Google / Search Engine Tags -->
    <meta itemprop="name" content={`The Burst dAppository - ${tokenData.name}`}>
    <meta itemprop="description" content={tokenData.desc}>
    <meta itemprop="image" content={tokenData.img}>

    <!-- Facebook Meta Tags -->
    <meta property="og:type" content="website">
    <meta itemprop="og:title" content={`The Burst dAppository - ${tokenData.name}`}>
    <meta property="og:description" content={tokenData.desc}>
    <meta property="og:image" content={tokenData.img}>

    <!-- Twitter Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content={`The Burst dAppository - ${tokenData.name}`}>
    <meta name="twitter:description" content={tokenData.desc}>
    <meta name="twitter:image" content={tokenData.img}>
</svelte:head>


{#if token}
    <TokenDetail {token} />
{/if}
