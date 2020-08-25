<script>
    import List from '@smui/list'
    import { BurstValue, convertNumericIdToAddress } from '@burstjs/util'
    import { accountStore, TokenItem, TokenItemVariant, Page } from '../_common'
    import MagicMapper from 'magic-mapper'
    import TokenDetailListItem from './TokenDetailListItem.svelte'
    import { ExplorerApi } from '../../context'

    export let token = {}
    let infoList = {}

    const { account$ } = accountStore

    $: isOwner = $account$.accountId === token.owner
    $: {

        if(token.at){
            const {at, creator, owner, minActivationPlanck, status, creationBlock, balancePlanck} = token
            infoList = {
                'Token Id': { v: convertNumericIdToAddress(at), url: ExplorerApi.getAccountUrl(at) },
                'Creator': { v: convertNumericIdToAddress(creator), url: ExplorerApi.getAccountUrl(creator) },
                'Owner': { v: convertNumericIdToAddress(owner), url: ExplorerApi.getAccountUrl(owner) },
                'Balance': { v: BurstValue.fromPlanck(balancePlanck) },
                'Activation Costs': { v: BurstValue.fromPlanck(minActivationPlanck) },
                'Creation Block': { v: creationBlock, url: ExplorerApi.getBlockUrl(creationBlock) },
                'Status': {v: status.toUpperCase() },
            }
        }
    }

</script>

<Page>
    <div class="detail-container">
        <section class="left">
            <TokenItem data={token} variant={isOwner ? TokenItemVariant.Owner : TokenItemVariant.Normal}/>
        </section>
        <section class="right">
            <List twoLine nonInteractive>
                {#each Object.keys(infoList) as key}
                    <TokenDetailListItem {key} value={infoList[key].v} url={infoList[key].url}/>
                {/each}
            </List>
        </section>
    </div>
</Page>


<style>
    .detail-container {
        display: flex;
        flex-direction: row;
    }

    .left,
    .right {
        width: 50%;
        max-width: 50%;
    }

    .left {
        margin-right: 1rem;
    }
</style>
