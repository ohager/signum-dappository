<script>
    import {theme$} from "./appStore"
</script>

<div class={`theme-${$theme$}`}>
    <slot/>
</div>

<style>
    :global(*.theme-default){}

    :global(*.theme-dark){
        --mdc-theme-primary : black;
        --mdc-theme-on-primary: white;
        --mdc-theme-surface : black;
    }
</style>
