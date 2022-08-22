<script>
  import List from '@smui/list'
  import {accountStore, TokenItem, TokenItemVariant, Page, convertNumericIdToAddress} from '../_common'
  import TokenDetailListItem from './TokenDetailListItem.svelte'
  import {ExplorerApi} from '../../context'
  import {Amount} from "@signumjs/util";

  export let token = {}
  let infoList = {}

  const {account$} = accountStore

  $: isOwner = $account$.accountId === token.owner
  $: {

    if (token.at) {
      const {
        at,
        creator,
        owner,
        minActivationPlanck,
        status,
        creationBlock,
        balancePlanck,
        donationPlanck,
        donationCount
      } = token
      infoList = {
        'Token Id': {v: convertNumericIdToAddress(at), url: ExplorerApi.getAccountUrl(at)},
        'Creator': {v: convertNumericIdToAddress(creator), url: ExplorerApi.getAccountUrl(creator)},
        'Owner': {v: convertNumericIdToAddress(owner), url: ExplorerApi.getAccountUrl(owner)},
        'Donated': {v: Amount.fromPlanck(donationPlanck)},
        'Number of Donations': {v: donationCount},
        'Balance': {v: Amount.fromPlanck(balancePlanck)},
        'Activation Costs': {v: Amount.fromPlanck(minActivationPlanck)},
        'Creation Block': {v: creationBlock, url: ExplorerApi.getBlockUrl(creationBlock)},
      }
    }
  }

</script>

<Page>
    <div class="detail-container">
        <section class="token">
            <TokenItem data={token} variant={isOwner ? TokenItemVariant.Owner : TokenItemVariant.Normal}/>
        </section>
        <section class="info">
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


    .token,
    .info {
        width: 50%;
        max-width: 50%;
    }

    .token {
        margin-right: 1rem;
    }

    @media (max-width: 480px) {
        .detail-container {
            flex-direction: column;
        }

        .token,
        .info {
            width: 100%;
            max-width: 100%;
        }

    }


</style>
