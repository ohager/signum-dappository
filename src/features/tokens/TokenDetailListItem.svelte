<script>
    export let key = ''
    export let value = ''
    export let url = null
</script>

<div class="list-item">
    <small>{key}</small>
    {#if url}
        <a href={url} target="_blank">
            <div class="v mdc-typography--headline7">{value}</div>
        </a>
    {:else}
        <div class="v mdc-typography--headline7">{value}</div>
    {/if}
</div>

<style>
    .v {
        line-height: 1rem;
    }

    .list-item {
        margin-bottom: 1rem;
    }

    .list-item small {
        color: #222;
    }
</style>
