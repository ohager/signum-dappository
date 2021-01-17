<script>
    import { EmptyToken } from '../../../utils/emptyToken'
    import Badge from './Badge.svelte'
    import { badgeRulesEngine } from '../../../services/badgeRulesEngine'
    import { tokens$ } from '../tokenStore'
    import { blockchainStatus$ } from '../appStore'

    export let token = EmptyToken

    let expanded = false
    let badges = []

    function toggleExpanded() {
        expanded = badges.length > 1 ? !expanded : expanded
    }

    $: allTokens = $tokens$.items.filter(t => t.isActive)
    $: {
        const { currentBlock: block } = $blockchainStatus$
        if(block){
            badges = badgeRulesEngine.run({ token, allTokens, block })
        }
    }

</script>

<div class="badges-collection" on:mouseenter={toggleExpanded} on:mouseleave={toggleExpanded}>
    {#each badges as badgeProps}
        <div class="badge-wrapper" class:expanded>
            <Badge {...badgeProps} />
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
