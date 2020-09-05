<script>
    import { fade } from 'svelte/transition'
</script>

<div class="tutorial-page" in:fade="{{ duration: 500 }}">
    <slot/>
</div>

<style>
    .tutorial-page {
        height: 480px;
        max-height: 480px;
        overflow-y: auto;
    }
</style>
