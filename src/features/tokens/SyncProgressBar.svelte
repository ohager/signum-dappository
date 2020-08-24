<script>
    import LinearProgress from '@smui/linear-progress'
    import { syncProgress$ } from './syncProgressStore'

    $: progress = $syncProgress$
    $: isSyncing = true //progress < 1

</script>

{#if isSyncing}
    <div class="sync-progressbar">
        <LinearProgress progress={progress}/>
    </div>
{/if}

<style>
    .sync-progressbar {
        position: relative;
        width: 100%;
        left: 0;
        bottom: 0;
    }
</style>
