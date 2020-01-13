<script>
    import Card, { ActionButtons, Actions, ActionIcons, PrimaryAction, Content, Media } from '@smui/card'
    import Button, { Label } from '@smui/button'
    import IconButton, { Icon } from '@smui/icon-button'
    import { goto, prefetch } from '@sapper/app'
    import { convertNQTStringToNumber } from '@burstjs/util'
    import { RouteDonate } from '../../../utils/routes'
    import Stamp from '../../../components/Stamp.svelte'

    export let isPreview = false
    export let data = {
        at: '',
        name: '',
        desc: '',
        repo: '',
        img: null,
        tags: [],
        donationPlanck: '0',
    }

    const DonationPath = RouteDonate(data.at)
    const PlaceholderImage = '../img/placeholder.noimage.svg'
    const PlaceholderErrorImage = '../img/placeholder.error.svg'

    $: imageUrl = data.img || PlaceholderImage
    $: mediaStyle = `
        background-image: url(${imageUrl});
    `

    const ifNotPreview = (fn) => () => {
        if (isPreview) return
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
    {#if isPreview}
        <div class='stamp-wrapper'>
            <Stamp text='Preview'></Stamp>
        </div>
    {/if}
    <PrimaryAction on:click={handleClick}>
        <img src={imageUrl} on:error={handleMediaError} hidden alt="nothing here!" />
        <Media aspectRatio="16x9" style={mediaStyle}></Media>
        <Content class="mdc-typography--body2">
            <h2 class="mdc-typography--headline6" style="margin: 0;">{data.name}</h2>
            {data.desc}
            <div>
                <small>Donated: {convertNQTStringToNumber(data.donationPlanck)} BURST</small>
            </div>
        </Content>
    </PrimaryAction>
    <Actions>
        <ActionButtons>
            <Button on:mouseenter={prefetchDonate} on:click={handleDonate}>
                <Label>Donate</Label>
            </Button>
        </ActionButtons>
        <ActionIcons>
            <IconButton on:click={handleClick} toggle aria-label="Add to favorites" title="Add to favorites">
                <Icon class="material-icons" on>favorite</Icon>
                <Icon class="material-icons">favorite_border</Icon>
            </IconButton>
            <IconButton class="material-icons" on:click={handleClick} title="Share">share</IconButton>
            <IconButton class="material-icons" on:click={handleClick} title="More options">more_vert</IconButton>
        </ActionIcons>
    </Actions>
</Card>
