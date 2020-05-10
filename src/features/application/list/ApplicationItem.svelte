<script>
    import Card, { ActionButtons, Actions, ActionIcons, PrimaryAction, Content, Media } from '@smui/card'
    import Button, { Label } from '@smui/button'
    import IconButton, { Icon } from '@smui/icon-button'
    import { goto, prefetch } from '@sapper/app'
    import { BurstValue } from '@burstjs/util'
    import { RouteDonate, RouteActivate, RouteTransfer } from '../../../utils/routes'
    import Stamp from '../../../components/Stamp.svelte'
    import { ApplicationItemVariant } from './constants'

    export let variant = ApplicationItemVariant.Normal
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
    const TransferPath = RouteTransfer(data.at)
    const PlaceholderImage = '../img/placeholder.noimage.svg'
    const PlaceholderErrorImage = '../img/placeholder.error.svg'

    $: donation = BurstValue.fromPlanck(data.donationPlanck).getBurst()
    $: imageUrl = data.img || PlaceholderImage
    $: mediaStyle = `
        background-image: url(${imageUrl});
    `

    const ifNotPreview = (fn) => () => {
        if (variant === ApplicationItemVariant.Preview) return
        fn()
    }

    const handleClick = ifNotPreview(() => {
        console.log('clicked')
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
        goto(ActivationPath)
    })

    const prefetchDeactivate = ifNotPreview(() => {
        prefetch(ActivationPath)
    })

    const handleTransfer = ifNotPreview(() => {
        goto(TransferPath)
    })

    const prefetchTransfer = ifNotPreview(() => {
        prefetch(TransferPath)
    })

</script>

<style>
    .stamp-wrapper {
        top: 50%;
        left: 25%;
        position: absolute;
        opacity: 0.33;
        z-index: 10;
    }
</style>

<Card style="position:relative; width: 360px;">
    {#if variant === ApplicationItemVariant.Preview}
        <div class='stamp-wrapper'>
            <Stamp text='Preview'/>
        </div>
    {/if}
    {#if !data.isActive}
        <div class='stamp-wrapper'>
            <Stamp text='Inactive'/>
        </div>
    {/if}
    <PrimaryAction on:click={handleClick}>
        <img src={imageUrl} on:error={handleMediaError} hidden alt="nothing here!"/>
        <Media aspectRatio="16x9" style={mediaStyle}/>
        <Content class="mdc-typography--body2">
            <h2 class="mdc-typography--headline6" style="margin: 0;">{data.name}</h2>
            {data.desc}
            <div>
                <small>Donated: {donation} BURST</small>
            </div>
        </Content>
    </PrimaryAction>
    <Actions>
        <ActionButtons>
            {#if variant === ApplicationItemVariant.Owner && !data.isActive}
                <Button on:mouseenter={prefetchActivate} on:click={handleActivate}>
                    <Label>Activate</Label>
                </Button>
            {:else if variant === ApplicationItemVariant.Owner && data.isActive}
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
        {#if variant !== ApplicationItemVariant.Owner}
            <ActionIcons>
                <IconButton on:click={handleClick} toggle aria-label="Add to favorites" title="Add to favorites">
                    <Icon class="material-icons" on>favorite</Icon>
                    <Icon class="material-icons">favorite_border</Icon>
                </IconButton>
                <IconButton class="material-icons" on:click={handleClick} title="Share">share</IconButton>
                <IconButton class="material-icons" on:click={handleClick} title="More options">more_vert</IconButton>
            </ActionIcons>
        {/if}
    </Actions>
</Card>
