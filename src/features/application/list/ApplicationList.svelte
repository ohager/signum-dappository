<script>
    import ApplicationItem from './ApplicationItem.svelte'
    import LinearProgress from '@smui/linear-progress'
    import { tokens$ } from '../applicationTokenStore'
    import Searchbar from '../../../components/Searchbar.svelte'
    import ApplicationItemLoadingIndicator from './ApplicationItemLoadingIndicator.svelte'

    let searchTerm = ''

    const hasText = (text, term) => text.toLowerCase().indexOf(term.toLowerCase()) !== -1

    const searchFilter = filter => ({ name, desc, tags }) =>
            hasText(name, filter)
            || hasText(desc, filter)

    $: activeTokens = $tokens$.items.filter(t => t.isActive).filter(searchFilter(searchTerm))
    $: hasTokens = activeTokens.length > 0

</script>

<div class="container">

    <section class="header">
        <Searchbar bind:value={searchTerm}/>
    </section>

    <section class="body">
        {#if !hasTokens}
            <div class="loading">
                <ApplicationItemLoadingIndicator/>
            </div>
        {/if}
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
    :root{

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
    }

    .body .loading {
        padding: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    @media (max-width: 768px) {
        .body .item {
            width: calc(100vw - 16px)
        }
    }

</style>
