<script>
    import { EmptyToken } from '../../utils/emptyToken'
    import Badge from './Badge.svelte'

    export let token = EmptyToken

    let expanded = false
    let badges = [
        {
            icon: 'new',
            text: 'New Token'
        },
        {
            icon: 'medal',
            text: 'Medal Merit'
        },
        {
            icon: 'medal',
            text: 'Medal Merit'
        },
        {
            icon: 'medal',
            text: 'Medal Merit'
        },
        {
            icon: 'medal',
            text: 'Medal Merit'
        },
    ]
    // TODO: create a Badge Collection Logic
    // rules and badge icons

    function toggleExpanded() {
        expanded = !expanded
    }

</script>

<div class="badges-collection" on:mouseenter={toggleExpanded} on:mouseleave={toggleExpanded}>
    {#each badges as { icon, text }}
        <div class="badge-wrapper" class:expanded>
            <Badge {icon} {text}/>
        </div>
    {/each}
</div>


<style>
    .badges-collection {
        display: inline-flex;
        flex-direction: row;
        margin-right: 0.5rem;
    }

    .badge-wrapper {
        margin-right: -20px;
        transition: margin-right 0.5s ease-in-out;
    }

    .badge-wrapper.expanded {
        margin-right: 0;
        transition: margin-right 0.5s ease-in-out;
    }
</style>
