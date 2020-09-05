<script>
    import { fade } from 'svelte/transition'
    import TextField from '@smui/textfield'
    import Icon from '@smui/textfield/icon'
    import IconButton from '@smui/icon-button'
    import SearchFilter from './SearchFilter.svelte'
    import { DefaultFilter } from '../../utils/filterTokens'

    export let value = DefaultFilter

    let isFilterMenuOpen = false

    function handleDelete() {
        value.text = ''
    }

    function toggleMenu() {
        isFilterMenuOpen = !isFilterMenuOpen
    }

</script>

<div class="search-bar">
    <div class="content">
        <TextField
            withLeadingIcon
            withTrailingIcon
            variant="outlined"
            bind:value={value.text}
            label="Enter search term, e.g. text, tag, name"
        >
            <Icon class="material-icons">search</Icon>
            {#if value.text.length}
                <Icon class="material-icons">delete</Icon>
                <div on:click={handleDelete} class="delete-action"></div>
            {/if}
        </TextField>
        <div class="filter-icon-wrapper">
            {#if isFilterMenuOpen}
                <div transition:fade class="menu-icon">
                    <IconButton class="material-icons" on:click={toggleMenu}>filter_list</IconButton>
                </div>
            {:else}
                <div transition:fade class="menu-icon">
                    <IconButton class="material-icons" on:click={toggleMenu}>dehaze</IconButton>
                </div>
            {/if}
        </div>
    </div>
    <SearchFilter expanded={isFilterMenuOpen} bind:options={value.options} />
</div>


<style>
    .search-bar {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .search-bar .content {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .search-bar .content :global(.mdc-text-field) {
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

    .filter-icon-wrapper {
        position: relative;
        height: 48px;
        width: 48px;
    }

    :global(.filter-icon-wrapper .menu-icon > .mdc-icon-button) {
        position: absolute;
        /*color: white !important;*/
    }

</style>
