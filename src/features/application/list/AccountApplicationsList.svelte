<script>
    import ApplicationItem from './ApplicationItem.svelte'
    import { ApplicationItemVariant } from './constants'
    import { tokens$ } from '../applicationTokenStore'
    import { activeTokenMonitors$ } from '../tokenMonitorStore'

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
            <ApplicationItem {data} variant={ApplicationItemVariant.Unconfirmed}/>
        </div>
    {/each}
    {#each tokens as data}
        <div class="item">
            <ApplicationItem {data}
                             variant={hasPendingTransaction(data.at)
                                 ? ApplicationItemVariant.Unconfirmed
                                 : ApplicationItemVariant.Owner
                             }
            />
        </div>
    {/each}
</div>
