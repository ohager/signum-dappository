<script>
    import Checkbox from '@smui/checkbox'
    import IconButton from '@smui/icon-button'
    import FormField from '@smui/form-field'
    import Expandable from '../Expandable.svelte'
    import { OmnibarViewMode } from './OmnibarViewMode'
    import { isClientSide } from '../../../utils/isClientSide'
    import { isMobile } from '../../../utils/isMobile'

    export let options = {
        expanded: true,
        newestFirst: false,
        orderByScore: false,
        orderAlphabetically: false,
        viewMode: OmnibarViewMode.Cards
    }

    function toggleViewOptions(selected) {
        return () => options.viewMode = selected
    }

    $: expanded = options.expanded
    $: viewMode = options.viewMode
    $: barHeight = isMobile() ? '120px' : '48px'

    function onResize(e){
        barHeight = window.innerWidth < 480 ? '120px' : '48px'
    }

</script>

<svelte:window on:resize={onResize} />

<Expandable {expanded} height={barHeight}>
    <div class="container">
        <div class="filter-options">
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
        <div class="view-options">
            <div class:active={viewMode === OmnibarViewMode.Cards}>
                <IconButton class="material-icons" on:click={toggleViewOptions(OmnibarViewMode.Cards)}>view_module
                </IconButton>
            </div>
            <div class:active={viewMode === OmnibarViewMode.SmallCards}>
                <IconButton class="material-icons" on:click={toggleViewOptions(OmnibarViewMode.SmallCards)}>view_comfy
                </IconButton>
            </div>
            <div class:active={viewMode === OmnibarViewMode.List}>
                <IconButton class="material-icons" on:click={toggleViewOptions(OmnibarViewMode.List)}>view_list
                </IconButton>
            </div>
        </div>
    </div>
</Expandable>

<style>
    .container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .view-options {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    :not(.active) > :global(.mdc-icon-button) {
        opacity: 0.33;
    }

    @media (max-width: 480px) {
        .container {
            flex-direction: column;
        }

        .filter-options {
            flex-direction: column;
        }
    }


</style>
