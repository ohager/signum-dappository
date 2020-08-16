<script>
    import ApplicationItem from './ApplicationItem.svelte'
    import { ApplicationItemVariant } from './constants'
    import LinearProgress from '@smui/linear-progress'
    import { tokens$ } from '../applicationTokenStore'
    import { syncProgress$ } from '../tokenSync/syncProgressStore'
    import Searchbar from '../../../components/Searchbar.svelte'
    import ApplicationItemMessageCard from './ApplicationItemMessageCard.svelte'

    let searchTerm = ''

    const hasText = (text, term) => text.toLowerCase().indexOf(term.toLowerCase()) !== -1

    const searchFilter = filter => ({ name, desc, tags }) =>
            hasText(name, filter)
            || hasText(desc, filter)

    $: activeTokens = $tokens$.items.filter(t => t.isActive).filter(searchFilter(searchTerm))
    $: unconfirmedTokens = $tokens$.unconfirmedItems.filter(searchFilter(searchTerm))
    $: isSyncing = $syncProgress$ < 1
    $: hasTokens = activeTokens.length > 0

</script>

<div class="container">

    {#if hasTokens}
        <section class="header">
            <Searchbar bind:value={searchTerm}/>
        </section>
    {/if}
    <section class="body">
        {#if isSyncing && !hasTokens}
            <div class="centered">
                <ApplicationItemMessageCard animated icon="/img/synchronization.svg">
                    <div class="mdc-typography--body2">Synchronizing...</div>
                </ApplicationItemMessageCard>
            </div>
        {/if}
        {#if !isSyncing && !hasTokens}
            <div class="centered">
                <ApplicationItemMessageCard icon="/img/empty.svg">
                    <div class="mdc-typography--body1">No active Tokens available yet.</div>
                    <div class="mdc-typography--body2">Be the first to register one! 👑</div>
                </ApplicationItemMessageCard>
            </div>
        {:else}
            <div class="item-list">
                {#each activeTokens as data}
                    <div class="item">
                        <ApplicationItem {data}/>
                    </div>
                {/each}
            </div>
        {/if}
    </section>
</div>


<style>
    :root {

    }

    .container {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        margin-inline-start: 0;
    }

    .header {
        display: flex;
        flex-direction: row;
        padding: 1rem;
        border: 1px solid #efefef;
    }

    .body .item {
        padding: 0.5rem;
        width: 360px;
    }

    .body .item-list {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        height: calc(100vh - 48px - 90px - 16px);
        overflow: auto;
        justify-content: center;
    }

    .body .centered {
        padding: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

</style>
