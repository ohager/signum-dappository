<script>
    import ApplicationItem from './ApplicationItem.svelte'
    import { ApplicationItemVariant } from './constants'
    import { tokens$ } from '../applicationTokenStore'

    export let accountId

    $: tokens = $tokens$.items.filter(i => i.creator === accountId)
    $: unconfirmedTokens = $tokens$.unconfirmedItems.filter(i => i.creator === accountId)

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
            <ApplicationItem {data} variant={ApplicationItemVariant.Owner}/>
        </div>
    {/each}
</div>
