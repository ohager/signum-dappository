<script>
    import Paper from '@smui/paper'
</script>

<style>
    .page {
        margin: 0 auto;
        max-width: 80%;
    }

    @media (max-width: 480px) {
        .page {
            max-width: 100%;
        }
    }
</style>

<section class="page">
    <Paper>
        <slot/>
    </Paper>
</section>
