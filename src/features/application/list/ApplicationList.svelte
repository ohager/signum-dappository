<script>
    import LinearProgress from '@smui/linear-progress'
    import ApplicationItem from './ApplicationItem.svelte'
    import { syncProgress$, tokens$ } from '../../../stores/applicationStore'

    $: isProgressVisible = $syncProgress$ < 1


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
    {#if isProgressVisible}
        <div class="sync-progressbar">
            <LinearProgress progress={$syncProgress$}/>
        </div>
    {/if}
    {#each $tokens$.items as data}
        <div class="item">
            <ApplicationItem {data}/>
        </div>
    {/each}
</div>
