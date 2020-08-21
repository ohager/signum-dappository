<script>
    import LinearProgress from '@smui/linear-progress'
    import { syncProgress$ } from './syncProgressStore'

    $: progress = $syncProgress$
    $: isSyncing = progress < 1

</script>

{#if isSyncing}
    <div class="sync-progressbar">
        <LinearProgress progress={progress}/>
    </div>
{/if}

<style>
    .sync-progressbar {
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
    }
</style>
