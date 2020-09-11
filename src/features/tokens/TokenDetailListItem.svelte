<script>
    import Link from '../_common/Link.svelte'
    export let key = ''
    export let value = ''
    export let url = null
</script>

<div class="list-item">
    <small>{key}</small>
    {#if url}
        <Link href={url}>
            <div class="v mdc-typography--headline7">{value}</div>
        </Link>
    {:else}
        <div class="v mdc-typography--headline7">{value}</div>
    {/if}
</div>

<style>
    .v {
        line-height: 1rem;
        font-weight: bold;
    }

    .list-item {
        margin-bottom: 0.5rem;
    }
</style>
