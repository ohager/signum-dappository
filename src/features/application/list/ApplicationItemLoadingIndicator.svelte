<script>
    import Card from '@smui/card';
</script>

<Card class='loading-card mdc-typography--body2' variant="outlined" padded>
    <div class="text">Synchronizing...</div>
</Card>

<style>
    .text {
        width: 320px;
        text-align: center;
        animation: fade 3s ease-in-out infinite alternate-reverse;
    }

    @keyframes fade {
        0% {
            opacity: 1.0
        }
        100% {
            opacity: 0.0
        }
    }


</style>
