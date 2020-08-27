<script>
    import Paper from '@smui/paper'
</script>

<style>
    .page {
        margin: 1rem auto 0;
        max-width: 80%;
    }

    @media (max-width: 480px) {
        .page {
            max-width: 100%;
        }
    }

    @media (min-width: 481px) and (max-width: 768px) {
        .page {
            max-width: 98%;
        }
    }

    @media (min-width: 1280px) {
        .page {
            max-width: 50%;
        }
    }
</style>

<section class="page">
    <Paper>
        <slot/>
    </Paper>
</section>
