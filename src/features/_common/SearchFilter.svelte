<script>
    import Checkbox from '@smui/checkbox'
    import FormField from '@smui/form-field'
    import { DefaultFilter } from '../../utils/filterTokens'

    export let expanded = false
    export let options = DefaultFilter.options

</script>

<div class="search-filter" class:expanded>
    <FormField>
        <Checkbox bind:checked={options.orderAlphabetically} />
        <span slot="label">Alphabetical Order</span>
    </FormField>
    <FormField>
        <Checkbox bind:checked={options.orderByScore} />
        <span slot="label">Highest Scores First</span>
    </FormField>
    <FormField>
        <Checkbox bind:checked={options.newestFirst} />
        <span slot="label">Newest First</span>
    </FormField>
</div>

<style>
    .search-filter {
        width: 100%;
        display: flex;
        flex-direction: row;
        height: 0px;
        overflow: hidden;
        transform: scale(0);
        transition: all 0.25s ease-out;
    }

    .search-filter.expanded {
        height: 48px;
        transform: scale(1);
        transition: all 0.25s ease-out;
    }

</style>
