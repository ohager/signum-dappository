<script>
    import {theme$} from "./appStore"
    let themeName = `theme-${$theme$}`
</script>

<div class={themeName}>
    <slot/>
</div>

<style>
    :global(*){
        --burst-blue: #00579d;
        --burst-dark-blue: #001e35;
    }

    :global(*.theme-default){
        --mdc-theme-primary : var(--burst-blue);
        --mdc-theme-secondary: #676778;
        --mdc-theme-on-primary: white;
        --mdc-theme-background : white;
        --mdc-theme-surface : white;
        --mdc-theme-error: var(--material-color-red-900);
    }

    :global(*.theme-dark){
        --mdc-theme-primary : black;
        --mdc-theme-on-primary: white;
        --mdc-theme-surface : black;
    }
</style>
