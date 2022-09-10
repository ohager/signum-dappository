<script>
    export let href = '#'
    export let target = '_blank'
    export let inline = false
</script>

<div class="link-wrapper" class:inline>
    <div class="material-icons" class:inline>exit_to_app</div>
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

    .link-wrapper.inline {
        display: inline;
    }

    .link-wrapper:hover{
        filter: drop-shadow(0px 0px 2px var(--theme-light-background));
        transition: all 100ms ease-in-out;
    }

    .link-wrapper .material-icons{
        font-size: 90%;
    }

    .link-wrapper .material-icons.inline{
        position: relative;
        top: 2px;
        right: -2px;
    }


</style>
