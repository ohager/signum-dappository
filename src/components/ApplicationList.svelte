<script>
    import ApplicationItem from './ApplicationItem.svelte'
    import { store } from '../stores/applicationStore'
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
</style>

<div class="container">
    <p>{$store.syncProgress}</p>
    {#each  $store.apps as data}
        <div class="item">
            <ApplicationItem {data}/>
        </div>
    {/each}
</div>
