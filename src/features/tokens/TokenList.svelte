<script>
    import LinearProgress from '@smui/linear-progress'
    import List from '@smui/list'
    import { scale } from 'svelte/transition'
    import {
        TokenItem,
        TokenItemVariant,
        Omnibar,
        OmnibarViewMode,
        tokenStore,
        omnibarStore$,
        Page,
    } from '../_common'
    import { syncProgress$ } from './syncProgressStore'
    import TokenItemMessageCard from './TokenItemMessageCard.svelte'
    import { filterTokens } from '../../utils/filterTokens'
    import TokenListItem from '../_common/tokenItem/TokenListItem.svelte'

    const { tokens$ } = tokenStore

    $: unfilteredActiveTokens = $tokens$.items.filter(t => t.isActive)
    $: activeTokens = filterTokens(unfilteredActiveTokens, $omnibarStore$)
    $: isSyncing = $syncProgress$ < 1
    $: hasTokens = activeTokens.length > 0
    $: isSearching = $omnibarStore$.text.length > 0
    $: countText = `${activeTokens.length}/${unfilteredActiveTokens.length}`
    $: viewMode = $omnibarStore$.options.viewMode

    function handleTagClick({ detail: tagName }) {
        $omnibarStore$.text = tagName
    }

</script>

<div  class="container">
    <section class="header">
            <Omnibar />
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
            <div class="item-list-container">
                {#if viewMode === OmnibarViewMode.List}
                    <ul class="item-list">
                        {#each activeTokens as data}
                            <TokenListItem {data} />
                        {/each}
                    </ul>
                {:else if viewMode === OmnibarViewMode.SmallCards}
                    <div class="item-list">
                        {#each activeTokens as data}
                            <div class="item compact">
                                <TokenItem {data} on:tag-click={handleTagClick} compact />
                            </div>
                        {/each}
                    </div>
                {:else}
                    <div class="item-list">
                        {#each activeTokens as data}
                            <div class="item">
                                <TokenItem {data} on:tag-click={handleTagClick} />
                            </div>
                        {/each}
                    </div>
                {/if}
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
        border-radius: 4px;
        display: flex;
        flex-direction: row;
        margin: 1rem;
        padding: 1rem;
        position: sticky;
        top: 0;
        z-index: 2;
        box-shadow: var(--box-shadow);
        background-color: var( --mdc-theme-surface);
        opacity: 97%;
    }

    .counter {
        position: absolute;
        bottom: -20px;
        right: 20px;
        color: grey;
        font-size: small;
    }

    .body .item {
        padding: 0.5rem;
        width: 360px;
    }

    .body .item.compact {
        width: 240px;
    }

    .body .item-list-container {
        position: relative;
        margin: 1rem
    }

    .body .item-list {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        overflow: auto;
        justify-content: center;
    }

    .body .item-list-container > ul.item-list {
        display: flex;
        flex-direction: column;
        width: 80%;
        margin: auto;
        padding: 0;
    }

    .body .centered {
        padding: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }


    @media (max-width: 480px) {
        .header {
            margin: 0;
            padding: 1rem 0.5rem 0.5rem 0.5rem;
        }
        .body .item-list-container > ul.item-list {
            width: 100%;
        }
        .body .item-list-container {
            margin: 1rem 0 0 0;
        }
    }

</style>
