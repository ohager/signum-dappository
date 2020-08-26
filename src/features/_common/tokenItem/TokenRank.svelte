<script>
    import { calculateRankingPoints } from '../../../utils/calculateRankingPoints'

    export let token

    $: points = calculateRankingPoints(token)

</script>

<div class="token-rank" title="Token Score">
    <div class="rank">
        <small>{points}</small>
        <img width="64" src="img/badges/banner.svg" alt="{`${points} points`}">
    </div>
</div>


<style>
    .token-rank {
        position: relative;
        display: flex;
        flex-direction: row;
    }

    .rank small {
        position: absolute;
        width: 64px;
        text-align: center;
        top: 25%;
        color: #222222;
    }
</style>
