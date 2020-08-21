<script>
    import Button, { Label } from '@smui/button'
    import TextField from '@smui/textfield'
    import Icon from '@smui/textfield/icon/index'

    export let value = ''

</script>

<div class="search-bar">
    <TextField
            withLeadingIcon
            variant="outlined"
            bind:value={value}
            label="Enter search term"
    >
        <Icon class="material-icons">search</Icon>
    </TextField>
</div>


<style>
    .search-bar {
        width: 100%;
    }
    .search-bar :global(.mdc-text-field) {
        width: 100%;
    }
</style>
