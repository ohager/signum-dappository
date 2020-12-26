<script>
    import { TokenItemVariant, TokenItem } from '../_common'
    import { tokens$ } from '../_common/tokenStore'
    import { activeTokenMonitors$ } from './tokenMonitorStore'
    import { scale } from 'svelte/transition'

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
        flex-direction: column;
        flex-wrap: wrap;
        margin-inline-start: 0;
        margin: 1rem;
        position: relative;
    }

    .body {
        position: absolute;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
    }

    .item {
        padding: 0.5rem;
        width: 360px;
    }
</style>

<div transition:scale class="container">
    <section class="body">
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
    </section>
</div>
