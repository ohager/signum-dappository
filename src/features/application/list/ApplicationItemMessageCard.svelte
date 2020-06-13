<script>
    import Card from '@smui/card'

    export let animated = false
    export let icon
</script>

<div>
    {#if icon}
        <div class="icon" class:icon-animated={animated}>
            <img src={icon} alt="Card Icon">
        </div>
    {/if}
    <Card class='loading-card' variant="outlined" padded>
        <div class="body" class:animated>
            <slot/>
        </div>
    </Card>
</div>

<style>
    .body {
        width: 320px;
        text-align: center;
    }

    .animated {
        animation: fade 3s ease-in-out infinite alternate-reverse;
    }

    .icon-animated {
        animation: roundabout 2s ease-in-out infinite;
    }

    .icon {
        text-align: center;
        margin-bottom: 1rem;
    }

    .icon > img {
        height: 128px;
    }

    @keyframes fade {
        0% {
            opacity: 1.0
        }
        100% {
            opacity: 0.0
        }
    }

    @keyframes roundabout {
        0% {
            transform: rotateZ(0deg);
        }
        100% {
            transform: rotate(359deg);
        }
    }


</style>
