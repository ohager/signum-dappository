<script>
    export let height = '48px'
    export let expanded = false
</script>

<div class:expanded style="--height: {height}">
    <slot />
</div>

<style>
    div {
        height: 0px;
        overflow: hidden;
        transform: scale(0);
        opacity: 0;
        transition: all 0.25s ease-out;
    }

    div.expanded {
        height: var(--height);
        transform: scale(1);
        opacity: 1;
        transition: all 0.25s ease-out;
    }

</style>
