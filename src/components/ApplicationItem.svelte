<script>
    import Card, { Content, PrimaryAction, Media, MediaContent, Actions, ActionButtons, ActionIcons } from '@smui/card'
    import Button, { Label } from '@smui/button'
    import IconButton, { Icon } from '@smui/icon-button'
    import List, { Item, Text } from '@smui/list'
    import {onMount} from 'svelte'
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
</script>

<style>
    .headline{
        border-radius: 4px;
        background-color: rgba(0,0,0,0.33);
        padding: 8px;
        color: white;
        position: absolute;
        top: 16px;
        left: 16px;
    }
</style>

<Card style="width: 360px;">
    <PrimaryAction on:click={handleClick}>
        <Media aspectRatio="16x9" style={mediaStyle}>
            <MediaContent>
                <div class="headline" >
                    <h2 class="mdc-typography--headline6" style="margin: 0;">{data.name}</h2>
                </div>
            </MediaContent>
        </Media>
        <Content class="mdc-typography--body2">
            {data.desc}
        </Content>
    </PrimaryAction>
    <Actions>
        <ActionButtons>
            <Button on:click={handleClick}>
                <Label>Donate</Label>
            </Button>
        </ActionButtons>
        <ActionIcons>
            <IconButton on:click={handleClick} toggle aria-label="Add to favorites" title="Add to favorites">
                <Icon class="material-icons" on>star</Icon>
                <Icon class="material-icons">star_border</Icon>
            </IconButton>
            <IconButton class="material-icons" on:click={handleClick} title="Share">share</IconButton>
            <IconButton class="material-icons" on:click={handleClick} title="More options">more_vert</IconButton>
        </ActionIcons>
    </Actions>
</Card>
