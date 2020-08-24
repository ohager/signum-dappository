<script>
    import {fade} from 'svelte/transition'
    import TextField from '@smui/textfield'
    import Icon from '@smui/textfield/icon/index'

    export let value = ''

    function handleDelete() {
        console.log('handleDelete')
        value = ''
    }

</script>

<div class="search-bar">
    <TextField
            withLeadingIcon
            withTrailingIcon
            variant="outlined"
            bind:value={value}
            label="Enter search term"
    >
        <Icon class="material-icons">search</Icon>
        {#if value.length}
            <Icon class="material-icons">delete</Icon>
            <div on:click={handleDelete} class="delete-action"></div>
        {/if}
    </TextField>
</div>


<style>
    .search-bar {
        width: 100%;
    }

    .search-bar :global(.mdc-text-field) {
        width: 100%;
    }

    .delete-action {
        cursor: pointer;
        height: 24px;
        width: 24px;
        position: absolute;
        top: 16px;
        right: 16px;
        z-index: 2;
    }
</style>
