<script>
    import Card, { Content, PrimaryAction, Media, MediaContent, Actions, ActionButtons, ActionIcons } from '@smui/card'
    import Button, { Label } from '@smui/button'
    import IconButton, { Icon } from '@smui/icon-button'
    import List, { Item, Text } from '@smui/list'
    import { onMount } from 'svelte'
    import { convertNQTStringToNumber } from '@burstjs/util'

    export let data = {
        name: '',
        desc: '',
        repo: '',
        img: null,
        tags: [],
    }

    const PlaceholderImage = 'https://via.placeholder.com/320x180.png?text=16x9'

    $: mediaStyle = `
        background-image: url(${data.img || PlaceholderImage});
    `
    const handleClick = () => {
        console.log('clicked')
    }
    const handleDonate = () => {
        console.log('donate')
    }
</script>

<style>
    .headline {
        border-radius: 4px;
        background-color: rgba(0, 0, 0, 0.33);
        padding: 8px;
        color: white;
        position: absolute;
        top: 16px;
        left: 16px;
    }
</style>


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
            <Button on:click={handleDonate}>
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
