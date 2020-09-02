<script>
    import {fade,fly} from 'svelte/transition'
</script>

<div class="tutorial-page" in:fade="{{ duration: 500 }}">
    <slot/>
</div>

<style>
    .tutorial-page {
        height: 400px;
        max-height: 400px;
        overflow-y: auto;
    }
</style>
