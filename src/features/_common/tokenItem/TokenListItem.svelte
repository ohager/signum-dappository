<script>
    import { Item, Graphic, Meta, Label, Text, PrimaryText, SecondaryText } from '@smui/list'
    import Button, { Label as ButtonLabel } from '@smui/button';
    import IconButton from '@smui/icon-button';
    import { goto } from '@sapper/app'
    import { RouteDonate, RouteTokenDetail } from '../../../utils/routes'
    import TokenRank from './TokenRank.svelte'
    import { calculateRankingPoints } from '../../../utils/calculateRankingPoints'
    import { isMobile } from '../../../utils/isMobile'

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

    $: score =  calculateRankingPoints(data)
    $: isCompactView = isMobile()

    const handleDetailsClick = (() => {
        goto(RouteTokenDetail(data.at))
    })

    const handleDonateClick = (() => {
        goto(RouteDonate(data.at))
    })

    function onResize(e){
        isCompactView = window.innerWidth < 480
    }
</script>


<svelte:window on:resize={onResize} />

<div class="token-list-item">
    <img src={data.img} alt="{data.name}" on:click={handleDetailsClick}/>
    <div class="text" on:click={handleDetailsClick}>
        <div class="mdc-typography--subtitle1">{data.name}</div>
        <div class="smaller mdc-typography--body1">Score: {score}</div>
    </div>
    <div class="actions">
        {#if isCompactView}
            <IconButton class="material-icons" on:click={handleDonateClick}>favorite_border</IconButton>
        {:else}
            <Button on:click={handleDonateClick}><ButtonLabel>Donate</ButtonLabel></Button>
        {/if}
    </div>
</div>

<style>
    .token-list-item {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        background-color: var( --mdc-theme-surface);
        padding: 8px;
        border-radius: 4px;
        margin-bottom: 2px;
        cursor: pointer;
        box-shadow: var(--box-shadow);
    }

    .token-list-item > img {
        border-radius: 2px;
        object-fit: cover;
        width: 114px;
        height: 64px;
        flex-grow: 1;
    }

    .token-list-item:hover {
        filter: brightness(0.95);
    }

    .smaller {
        font-size: 0.75rem;
        line-height: 1.25rem;
    }

    .text {
        margin-left: 1rem;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 50%;
        flex-grow: 2;
    }

    .actions {
        flex-grow: 1;
    }

</style>
