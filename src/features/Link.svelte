<script>
    export let href = '#'
    export let target = '_blank'
</script>

<div class="link-wrapper">
    <div class="material-icons">exit_to_app</div>
    <a class="link" {href} {target} rel="noopener noreferrer">
        <slot/>
    </a>
</div>

<style>
    .link-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        transition: all 100ms ease-in-out;
    }
    .link-wrapper:hover{
        filter: drop-shadow(0px 0px 2px var(--theme-light-background));
        transition: all 100ms ease-in-out;
    }

    .link-wrapper .material-icons{
        font-size: 90%;
    }
</style>
