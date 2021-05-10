<script context="module">
  import { preloadToken } from "../../utils/preloadToken";

  export async function preload({ params, query }) {
    const { tokenId } = params;
    const token = await preloadToken(tokenId);
    return { tokenId, tokenData: token };
  }
</script>


<script>
  import { tokens$ } from "../../features/_common/tokenStore";
  import TokenDetail from "../../features/tokens/TokenDetail.svelte";
  import TokenMetaHead from "../../features/_common/TokenMetaHead.svelte";

  export let tokenId;
  export let tokenData;
  $: token = $tokens$.items.find(i => i.at === tokenId);
</script>


<TokenMetaHead {tokenData} />
{#if token}
  <TokenDetail {token} />
{/if}
