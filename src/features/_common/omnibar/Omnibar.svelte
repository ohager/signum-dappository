<script>
    import { fade } from 'svelte/transition'
    import TextField from '@smui/textfield'
    import Icon from '@smui/textfield/icon'
    import IconButton from '@smui/icon-button'
    import OmnibarOptions from './OmnibarOptions.svelte'
    import { omnibarStore$, setText } from './omnibarStore'
    import { isMobile } from '../../../utils/isMobile'

    export let text = ''

    let isFilterMenuOpen = false

    $: placeholder = isMobile() ? 'Enter search term' : 'Enter search term, e.g. text, tag, name'
    $: {
        if(text.length){
            $omnibarStore$.text = text
        }
    }


    function handleDelete() {
        setText('')
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
            bind:value={$omnibarStore$.text}
            label={placeholder}
        >
            <Icon class="material-icons">search</Icon>
            {#if $omnibarStore$.text.length}
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
    <OmnibarOptions expanded={isFilterMenuOpen} bind:options={$omnibarStore$.options}/>
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
    }

</style>
