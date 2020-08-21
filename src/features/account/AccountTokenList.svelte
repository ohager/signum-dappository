<script>
    import { TokenItemVariant, TokenItem } from '../_common'
    import { tokens$ } from '../tokens/tokenStore'
    import { activeTokenMonitors$ } from './tokenMonitorStore'

    export let accountId

    const isNotDeactivated = i => i.version === 0 || (i.version > 0 && i.isActive)
    const isOwnToken = i => (i.owner && i.owner !== '0' ? i.owner : i.creator) === accountId

    $: tokens = $tokens$.items.filter(isOwnToken).filter(isNotDeactivated)
    $: unconfirmedTokens = $tokens$.unconfirmedItems.filter(isOwnToken)
    $: hasPendingTransaction = at => $activeTokenMonitors$.some(id => id === at)

</script>

<style>
    .container {
        display: flex;
        flex-wrap: wrap;
        margin-inline-start: 0;
    }

    .item {
        padding: 0.5rem;
        width: 360px;
    }
</style>

<div class="container">
    {#each unconfirmedTokens as data}
        <div class="item">
            <TokenItem {data} variant={TokenItemVariant.Unconfirmed}/>
        </div>
    {/each}
    {#each tokens as data}
        <div class="item">
            <TokenItem {data}
                             variant={hasPendingTransaction(data.at)
                                 ? TokenItemVariant.Unconfirmed
                                 : TokenItemVariant.Owner
                             }
            />
        </div>
    {/each}
</div>
