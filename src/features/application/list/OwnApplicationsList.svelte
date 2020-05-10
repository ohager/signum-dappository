<script>
    import ApplicationItem from './ApplicationItem.svelte'
    import { ApplicationItemVariant } from './constants'
    import { tokens$ } from '../../../stores/applicationTokenStore'

    export let ownerId

    $: tokens = $tokens$.items.filter(i => i.creator === ownerId)
</script>

<style>
    .container {
        display: flex;
        flex-wrap: wrap;
        margin-inline-start: 0;
    }

    .item {
        padding: 1rem;
    }

    .sync-progressbar {
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
    }
</style>

<div class="container">
    {#each tokens as data}
        <div class="item">
            <ApplicationItem {data} variant={ApplicationItemVariant.Owner}/>
        </div>
    {/each}
</div>
