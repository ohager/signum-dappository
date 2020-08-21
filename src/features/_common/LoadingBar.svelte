<script>
    import LinearProgress from '@smui/linear-progress'
    import { loading$ } from './appStore'

</script>

{#if $loading$}
    <div class="loading-bar">
        <LinearProgress indeterminate/>
    </div>
{/if}

<style>
    .loading-bar {
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
    }
</style>
