<script>
    import { beforeUpdate } from 'svelte'
    import Card, { ActionButtons, Actions, ActionIcons, PrimaryAction, Content, Media } from '@smui/card'
    import Button, { Label } from '@smui/button'
    import Chip, {Set, Text} from '@smui/chips'
    import IconButton, { Icon } from '@smui/icon-button'
    import { goto, prefetch } from '@sapper/app'
    import { BurstValue } from '@burstjs/util'
    import { RouteDonate, RouteActivate, RouteTransfer, RouteDeactivate } from '../../utils/routes'
    import { isEmptyString } from '../../utils/isEmptyString'
    import Stamp from './Stamp.svelte'
    import { TokenItemVariant } from './TokenItemVariant'
    import { Events } from '../../utils/events'
    import { dispatchEvent } from '../../utils/dispatchEvent'

    export let variant = TokenItemVariant.Normal
    export let data = {
        at: '',
        name: '',
        desc: '',
        repo: '',
        img: null,
        tags: [],
        donationPlanck: '0',
        isActive: true,
    }

    const DonationPath = RouteDonate(data.at)
    const ActivationPath = RouteActivate(data.at)
    const DeactivationPath = RouteDeactivate(data.at)
    const TransferPath = RouteTransfer(data.at)
    const PlaceholderImage = '../img/placeholder.noimage.svg'
    const PlaceholderErrorImage = '../img/placeholder.error.svg'
    let stampText = ''

    $: donation = BurstValue.fromPlanck(data.donationPlanck || '0').getBurst()
    $: imageUrl = data.img || PlaceholderImage
    $: mediaStyle = `
        background-image: url(${imageUrl});
    `
    $: isUnconfirmed = variant === TokenItemVariant.Unconfirmed
    $: hasPendingTx = variant === TokenItemVariant.HasPendingTransaction
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
        if (variant === TokenItemVariant.Preview ) return
        fn()
    }

    const handleClick = ifNotPreview(() => {
        if(variant !== TokenItemVariant.Normal) return

        if(data.repo){
            window.open(data.repo, "_blank")
        } else
        {
            dispatchEvent(Events.Info, 'Application has no registered project site')
        }
    })

    const handleDonate = ifNotPreview(() => {
        goto(DonationPath)
    })

    const handleMediaError = (e) => {
        imageUrl = PlaceholderErrorImage
    }

    const prefetchDonate = ifNotPreview(() => {
        prefetch(DonationPath)
    })

    const handleActivate = ifNotPreview(() => {
        goto(ActivationPath)
    })

    const prefetchActivate = ifNotPreview(() => {
        prefetch(ActivationPath)
    })

    const handleDeactivate = ifNotPreview(() => {
        goto(DeactivationPath)
    })

    const prefetchDeactivate = ifNotPreview(() => {
        prefetch(DeactivationPath)
    })

    const handleTransfer = ifNotPreview(() => {
        goto(TransferPath)
    })

    const prefetchTransfer = ifNotPreview(() => {
        prefetch(TransferPath)
    })

</script>

<div class="item-container">

    {#if !isEmptyString(stampText) }
        <div class='stamp-wrapper'>
            <Stamp text={stampText}/>
        </div>
    {/if}

    <div class:is-unconfirmed={isUnconfirmed}
         class:animation-fading={isUnconfirmed}
         class="item-wrapper">
        <Card>
            <PrimaryAction on:click={handleClick}>
                <img src={imageUrl} on:error={handleMediaError} hidden alt="nothing here!"/>
                <Media aspectRatio="16x9" style={mediaStyle}/>
                <Content class="mdc-typography--body2">
                    <h2 class="mdc-typography--headline6" style="margin: 0;">{data.name}</h2>
                    <div class="tags-wrapper">
                        <Set chips={data.tags} let:chip>
                            <Chip shouldRemoveOnTrailingIconClick={false}>
                                <Text>{chip}</Text>
                            </Chip>
                        </Set>
                    </div>
                    {data.desc}
                    <div>
                        <small>Donated: {donation} BURST</small>
                    </div>
                </Content>
            </PrimaryAction>
            {#if variant !== TokenItemVariant.Unconfirmed && variant !== TokenItemVariant.NoActions}
                <Actions>
                    <ActionButtons>
                        {#if variant === TokenItemVariant.Owner && !data.isActive}
                            <Button on:mouseenter={prefetchActivate} on:click={handleActivate}>
                                <Label>Activate</Label>
                            </Button>
                        {:else if variant === TokenItemVariant.Owner && data.isActive}
                            <Button on:mouseenter={prefetchDeactivate} on:click={handleDeactivate}>
                                <Label>Deactivate</Label>
                            </Button>
                            <Button on:mouseenter={prefetchTransfer} on:click={handleTransfer}>
                                <Label>Transfer</Label>
                            </Button>
                        {:else}
                            <Button on:mouseenter={prefetchDonate} on:click={handleDonate}>
                                <Label>Donate</Label>
                            </Button>
                        {/if}
                    </ActionButtons>
                    {#if variant !== TokenItemVariant.Owner}
                        <ActionIcons>
                            <IconButton on:click={handleClick} toggle aria-label="Add to favorites"
                                        title="Add to favorites">
                                <Icon class="material-icons" on>favorite</Icon>
                                <Icon class="material-icons">favorite_border</Icon>
                            </IconButton>
                            <IconButton class="material-icons" on:click={handleClick} title="Share">share</IconButton>
                            <IconButton class="material-icons" on:click={handleClick} title="More options">more_vert
                            </IconButton>
                        </ActionIcons>
                    {/if}
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
        z-index: 10;
    }

    .tags-wrapper :global(.mdc-chip__text) {
        font-size: 80%;
    }

    .tags-wrapper :global(.mdc-chip) {
        margin: 0;
        height: 24px;
    }

</style>
