<script>
    import Paper from '@smui/paper'
    import {scale} from 'svelte/transition'

    export let id = ''
</script>

<style>
    .page {
        position: relative;
        margin: 1rem auto 0;
        max-width: 80%;
    }

    .wrapper {
        position: absolute;
        width: 100%;
    }

    @media (max-width: 480px) {
        .page {
            margin: 0;
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

<section transition:scale class="page" {id}>
    <div class="wrapper">
        <Paper>
            <slot/>
        </Paper>
    </div>
</section>
