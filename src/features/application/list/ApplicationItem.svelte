<script>
    import Card, {ActionButtons, Actions, ActionIcons, PrimaryAction, Content, Media} from '@smui/card'
    import Button, {Label} from '@smui/button'
    import IconButton, {Icon} from '@smui/icon-button'
    import { goto, prefetch } from '@sapper/app'
    import {convertNQTStringToNumber} from '@burstjs/util'

    export let data = {
        at: '',
        name: '',
        desc: '',
        repo: '',
        img: null,
        tags: [],
    }

    const DonationPath = `/donate/${data.at}`

    const PlaceholderImage = 'https://via.placeholder.com/320x180.png?text=16x9'

    $: mediaStyle = `
        background-image: url(${data.img || PlaceholderImage});
    `
    const handleClick = () => {
        console.log('clicked')
    }
    const handleDonate = () => {
        goto(DonationPath)
    }

    const prefetchDonate = () => {
        prefetch(DonationPath)
    }
</script>

<Card style="width: 360px;">
    <PrimaryAction on:click={handleClick}>
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
