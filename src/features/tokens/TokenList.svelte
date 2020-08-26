<script>
    import LinearProgress from '@smui/linear-progress'
    import { TokenItem, TokenItemVariant, Searchbar } from '../_common'
    import { tokenStore } from '../_common'
    import { syncProgress$ } from './syncProgressStore'
    import TokenItemMessageCard from './TokenItemMessageCard.svelte'

    let searchTerm = ''

    const { tokens$ } = tokenStore
    const hasText = (text, term) => text.toLowerCase().indexOf(term.toLowerCase()) !== -1

    const searchFilter = filter => ({ name, desc, tags }) =>
        hasText(name, filter) || hasText(desc, filter) || tags.includes(filter)

    $: unfilteredActiveTokens = $tokens$.items.filter(t => t.isActive)
    $: activeTokens = unfilteredActiveTokens.filter(searchFilter(searchTerm))
    $: isSyncing = $syncProgress$ < 1
    $: hasTokens = activeTokens.length > 0
    $: isSearching = searchTerm.length > 0
    $: countText = `${activeTokens.length}/${unfilteredActiveTokens.length}`

    function handleTagClick({detail: tagName}){
        searchTerm = tagName
    }

</script>

<div class="container">
    <section class="header">
            <Searchbar bind:value={searchTerm}/>
            <div class="counter mdc-typography--body2">{countText}</div>
    </section>

    <section class="body">
        {#if !isSearching && isSyncing && !hasTokens}
            <div class="centered">
                <TokenItemMessageCard animated icon="/img/synchronization.svg">
                    <div class="mdc-typography--body2">Synchronizing...</div>
                </TokenItemMessageCard>
            </div>
        {/if}
        {#if isSearching && !hasTokens}
            <div class="centered">
                <TokenItemMessageCard icon="/img/empty.svg">
                    <div class="mdc-typography--body2">Nothing found</div>
                </TokenItemMessageCard>
            </div>
        {/if}
        {#if !isSearching && !isSyncing && !hasTokens}
            <div class="centered">
                <TokenItemMessageCard icon="/img/empty.svg">
                    <div class="mdc-typography--body1">No active Tokens available yet.</div>
                    <div class="mdc-typography--body2">Be the first to register one! 👑</div>
                </TokenItemMessageCard>
            </div>
        {:else}
            <div class="item-list">
                {#each activeTokens as data}
                    <div class="item">
                        <TokenItem {data} on:tag-click={handleTagClick}/>
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
        position: sticky;
        top: 0;
        z-index: 2;
        box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
        background-color: white;
        opacity: 97%;
    }

    .header > .counter {
        position: absolute;
        right: 20px;
        color: grey;
        font-size: small;
    }

    .body .item {
        padding: 0.5rem;
        width: 360px;
    }

    .body .item-list {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
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
