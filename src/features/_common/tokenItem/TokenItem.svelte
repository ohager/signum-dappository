<script>
  import {createEventDispatcher} from 'svelte'
  import Card, {ActionButtons, Actions, ActionIcons, PrimaryAction, Content, Media} from '@smui/card'
  import Button, {Label} from '@smui/button'
  import Chip, {Set, Text} from '@smui/chips'
  import IconButton, {Icon} from '@smui/icon-button'
  import MenuSurface from '@smui/menu-surface'
  import {goto, prefetch} from '@sapper/app'
  import {
    RouteDonate,
    RouteActivate,
    RouteTransfer,
    RouteDeactivate,
    RouteTokenDetail,
    RouteAccountTokens,
  } from '../../../utils/routes'
  import {isEmptyString} from '../../../utils/isEmptyString'
  import Stamp from '../Stamp.svelte'
  import {TokenItemVariant} from './TokenItemVariant'
  import BadgeCollection from '../badge/BadgeCollection.svelte'
  import TokenRank from './TokenRank.svelte'
  import SocialMediaList from './SocialMediaList.svelte'
  import {setAccount} from '../accountStore'
  import {Amount} from "@signumjs/util";

  export let compact = false
  export let variant = TokenItemVariant.Normal
  export let data = {
    at: '',
    name: '',
    desc: '',
    repo: '',
    owner: '',
    img: null,
    tags: [],
    donationPlanck: '0',
    isActive: true,
  }

  const PlaceholderImage = '../img/placeholder.noimage.svg'
  const PlaceholderErrorImage = '../img/placeholder.error.svg'
  let stampText = ''
  let isElevated = false
  let sharingIconSurface = null
  const dispatch = createEventDispatcher()

  $: tags = data.tags && data.tags.filter(t => t.trim().length > 0).map( t => t.toUpperCase() )
  $: donation = Amount.fromPlanck(data.donationPlanck || '0')
  $: imageUrl = data.img || PlaceholderImage
  $: mediaStyle = `
        background-image: url(${imageUrl});
        background-size: cover;
    `
  $: isUnconfirmed = variant === TokenItemVariant.Unconfirmed
  $: {
    if (variant === TokenItemVariant.Preview) {
      stampText = 'Preview'
    } else if (variant === TokenItemVariant.Unconfirmed) {
      stampText = 'Confirming'
    } else if (!data.isActive) {
      stampText = 'Inactive'
    } else {
      stampText = ''
    }
  }

  const ifNotPreview = (fn) => () => {
    if (variant === TokenItemVariant.Preview) {
      return Promise.resolve()
    }
    return fn()
  }

  const handleShareClick = ifNotPreview(() => {
    sharingIconSurface.setOpen(true)
  })

  const prefetchDetails = ifNotPreview(() => {
    prefetch(RouteTokenDetail(data.at))
  })

  const handleDetailsClick = ifNotPreview(async () => {
    await goto(RouteTokenDetail(data.at))
  })

  const prefetchOwnerTokens = ifNotPreview(() => {
    prefetch(RouteAccountTokens(data.owner))
  })

  const handleOwnerTokensClick = ifNotPreview(async () => {
    setAccount(data.owner)
    await goto(RouteAccountTokens(data.owner))
  })

  const handleProjectClick = ifNotPreview(() => {
    window.open(data.repo, '_blank')
  })

  const handleDonate = ifNotPreview(() => {
    goto(RouteDonate(data.at))
  })

  const handleMediaError = (e) => {
    imageUrl = PlaceholderErrorImage
  }

  const prefetchDonate = ifNotPreview(() => {
    prefetch(RouteDonate(data.at))
  })

  const handleActivate = ifNotPreview(() => {
    goto(RouteActivate(data.at))
  })

  const prefetchActivate = ifNotPreview(() => {
    prefetch(RouteActivate(data.at))
  })

  const handleDeactivate = ifNotPreview(() => {
    goto(RouteDeactivate(data.at))
  })

  const prefetchDeactivate = ifNotPreview(() => {
    prefetch(RouteDeactivate(data.at))
  })

  const handleTransfer = ifNotPreview(() => {
    goto(RouteTransfer(data.at))
  })

  const prefetchTransfer = ifNotPreview(() => {
    prefetch(RouteTransfer(data.at))
  })

  const handleChipClick = (e) => {
    e.preventDefault()
    e.stopImmediatePropagation()
    dispatch('tag-click', e.target.textContent)
  }

</script>

<div class="item-container">

    {#if !isEmptyString(stampText) }
        <div class='stamp-wrapper'>
            <Stamp text={stampText}/>
        </div>
    {/if}

    <div class:is-unconfirmed={isUnconfirmed}
         class:animation-fading={isUnconfirmed}
         on:mouseenter={() => isElevated=true}
         on:mouseleave={() => isElevated=false}
         class:mdc-elevation--z8={isElevated}
         class="item-wrapper mdc-elevation-transition">
        <Card>
            <PrimaryAction on:mouseenter={prefetchDetails} on:click={handleDetailsClick}>
                <img src={imageUrl} on:error={handleMediaError} hidden alt="nothing here!"/>
                <Media aspectRatio="16x9" style={mediaStyle}>
                    <div class="badge-wrapper">
                        <BadgeCollection token={data}/>
                    </div>
                    <div class="rank-wrapper">
                        <TokenRank token={data}/>
                    </div>
                </Media>
                <Content class="mdc-typography--body2">
                    {#if !compact}
                        <h2 class="mdc-typography--headline6" style="margin: 0;">{data.name}</h2>
                        <div class="tags-wrapper">
                            <Set chips={tags} let:chip>
                                <Chip shouldRemoveOnTrailingIconClick={false} on:click={handleChipClick}>
                                    <Text>{chip}</Text>
                                </Chip>
                            </Set>
                        </div>
                        {data.desc}
                    {:else}
                        <h2 class="compact-title mdc-typography--headline6">{data.name}</h2>
                    {/if}
                </Content>
            </PrimaryAction>
            {#if variant !== TokenItemVariant.Unconfirmed && variant !== TokenItemVariant.NoActions}
                <Actions>
                    <ActionButtons>
                        {#if variant === TokenItemVariant.Owner && !data.isActive}
                            {#if compact}
                                <IconButton class="material-icons" on:click={handleActivate}
                                            title="Activate">power_outlined
                                </IconButton>
                            {:else}
                                <Button on:mouseenter={prefetchActivate} on:click={handleActivate}>
                                    <Label>Activate</Label>
                                </Button>
                            {/if}
                        {:else if variant === TokenItemVariant.Owner && data.isActive}
                            {#if compact}
                                <IconButton class="material-icons" on:click={handleDeactivate}
                                            title="Deactivate">power_off_outlined
                                </IconButton>
                                <IconButton class="material-icons" on:click={handleTransfer}
                                            title="Transfer">compare_arrows
                                </IconButton>
                            {:else}
                                <Button on:mouseenter={prefetchDeactivate} on:click={handleDeactivate}>
                                    <Label>Deactivate</Label>
                                </Button>
                                <Button on:mouseenter={prefetchTransfer} on:click={handleTransfer}>
                                    <Label>Transfer</Label>
                                </Button>
                            {/if}
                        {:else}
                            {#if compact}
                                <IconButton class="material-icons" on:click={prefetchDonate}
                                            title="Donate">favorite_border
                                </IconButton>
                            {:else}
                                <Button on:mouseenter={prefetchDonate} on:click={handleDonate}>
                                    <Label>Donate</Label>
                                </Button>
                            {/if}
                            {#if !compact && !isEmptyString(data.repo)}
                                <Button on:click={handleProjectClick}>
                                    <Label>Visit Project</Label>
                                </Button>
                            {/if}
                        {/if}
                    </ActionButtons>
                    <ActionIcons>
                        {#if variant !== TokenItemVariant.Owner}
                            {#if compact && !isEmptyString(data.repo)}
                                <IconButton class="material-icons" on:click={handleProjectClick}
                                            title="Visit Project Site">web
                                </IconButton>
                            {/if}
                            <IconButton class="material-icons" on:mouseenter={prefetchOwnerTokens}
                                        on:click={handleOwnerTokensClick} title="See all tokens of this owner">
                                person_search
                            </IconButton>
                        {/if}
                        <div class="share">
                            <IconButton class="material-icons" on:click={handleShareClick}
                                        title="Share on Social Media">share
                            </IconButton>
                            <MenuSurface bind:this={sharingIconSurface} anchorCorner="TOP_LEFT">
                                <SocialMediaList token={data}/>
                            </MenuSurface>
                        </div>
                    </ActionIcons>
                </Actions>
            {/if}
        </Card>
    </div>
</div>


<style>
    .is-unconfirmed {
        opacity: 0.5;
        filter: grayscale(1);
    }

    .item-wrapper,
    .item-container {
        position: relative;
    }

    .stamp-wrapper {
        top: 50%;
        left: 25%;
        position: absolute;
        opacity: 0.5;
        z-index: 5;
    }

    .tags-wrapper :global(.mdc-chip__text) {
        font-size: 80%;
    }

    .tags-wrapper :global(.mdc-chip) {
        height: 24px;
        margin: 2px 2px 0 0;
    }

    .tags-wrapper :global(.mdc-chip-set) {
        padding: 0;
        margin-bottom: 0.25rem;
    }

    .badge-wrapper {
        position: absolute;
        top: 1rem;
        right: 1rem;
        filter: drop-shadow(0px 2px 2px #555555)
    }

    .rank-wrapper {
        position: absolute;
        right: 1rem;
        bottom: 0;
        filter: drop-shadow(0px 2px 2px #555555)
    }

    .compact-title {
        margin: 0;
        font-size: 90%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden
    }
</style>
