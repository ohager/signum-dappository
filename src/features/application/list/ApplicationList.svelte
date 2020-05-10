<script>
    import LinearProgress from '@smui/linear-progress'
    import ApplicationItem from './ApplicationItem.svelte'
    import { syncProgress$, tokens$ } from '../../../stores/applicationTokenStore'
    import Searchbar from '../../../components/Searchbar.svelte'

    let searchTerm = ''

    const hasText = (text, term) => text.toLowerCase().indexOf(term.toLowerCase()) !== -1

    const searchFilter = filter => ({ name, desc, tags }) =>
            hasText(name, filter)
            || hasText(desc, filter)

    $: activeTokens = $tokens$.items.filter(t => t.isActive).filter(searchFilter(searchTerm))
    $: progress = $syncProgress$
    $: progressPercent = ($syncProgress$ * 100).toFixed(0)
    $: isFirstTime = $tokens$.isFirstSync
    $: isProgressVisible = progress < 1 && isFirstTime

</script>

<div class="container">

    {#if isProgressVisible}
        <div class="sync-progressbar">
            <LinearProgress progress={progress}/>
        </div>
    {/if}

    <section class="header">
        {#if isFirstTime}
            <div>
                <h2>{`Syncing...please wait until finished - ${progressPercent} %`}</h2>
            </div>
        {:else}
            <Searchbar bind:value={searchTerm}/>
        {/if}
    </section>

    <section class="body">
        <div class="item-list">
            {#each activeTokens as data}
                <div class="item">
                    <ApplicationItem {data}/>
                </div>
            {/each}
        </div>
    </section>
</div>


<style>
    .container {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        margin-inline-start: 0;
    }

    .sync-progressbar {
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
    }

    .header {
        display: flex;
        flex-direction: row;
        padding: 1rem;
        border: 1px solid #efefef;
    }

    .body .item {
        padding: 0.5rem;
    }

    .body .item-list {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
    }
</style>
