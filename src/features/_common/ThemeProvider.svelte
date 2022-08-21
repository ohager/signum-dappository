<script>
    import {theme$} from "./appStore"
    $: themeName = `theme-${$theme$}`
</script>

<div class={themeName}>
    <slot/>
</div>

<style>
    :global(*){
        --dark-grey: #444;
        --mid-grey: #676778;
        --solar-grey: #b2b2d4;
        --signum-blue: #0066ff;
        --signum-dark-blue: #323f65;
        --signum-darker-blue: #001e35;
        transition: color, background-color 500ms ease-in;
    }

    :global(*.theme-default){
        --theme-text: var(--signum-dark-blue);
        --mdc-theme-background : white;
        --mdc-theme-error: var(--material-color-red-900);
        --mdc-theme-primary : var(--signum-blue);
        --mdc-theme-secondary: var(--mid-grey);
        --mdc-theme-surface : white;
        --mdc-theme-on-surface : var(--signum-dark-blue);
        --mdc-theme-text-primary-on-background:var(--signum-dark-blue);
        --mdc-theme-text-primary-on-surface:var(--signum-dark-blue);
        --theme-hover-background: black;
        --theme-hover-opacity: 0.04;
        --theme-light-background: var(--solar-grey);
        --theme-lighter-background: white;
    }

    :global(*.theme-dark){
        --theme-text: var(--solar-grey);
        --mdc-theme-background : var(--signum-darker-blue);
        --mdc-theme-error: var(--material-color-red-600);
        --mdc-theme-on-background: var(--theme-text);
        --mdc-theme-on-primary: var(--theme-text);
        --mdc-theme-on-secondary: var(--signum-dark-blue);
        --mdc-theme-on-surface: var(--theme-text);
        --mdc-theme-primary : var(--signum-dark-blue);
        --mdc-theme-secondary: var(--solar-grey);
        --mdc-theme-surface: var(--theme-lighter-background) ;
        --mdc-theme-text-primary-on-background: var(--theme-text);
        --mdc-theme-text-primary-on-surface: var(--theme-text);
        --mdc-theme-text-secondary-on-background: var(--theme-text);
        --mdc-theme-text-secondary-on-surface: var(--theme-text);
        --theme-hover-background: white;
        --theme-hover-opacity: 0.1;
        --theme-light-background: var(--solar-grey);
        --theme-lighter-background: var(--signum-dark-blue);
    }

    :global(main){
        background-color: var(--mdc-theme-background);
        color: var(--theme-text);
    }

    :global(a),
    :global(a:visited){
        text-decoration: none;
        color: var(--theme-text);
    }

    :global([class*="mdc-drawer"]),
    :global([class*="mdc-icon"]),
    :global([class*="mdc-chip"]),
    :global([class*="mdc-list"]),
    :global([class*="mdc-tab"]),
    :global([class*="mdc-select"]),
    :global([class*="mdc-line"]),
    :global([class*="mdc-dialog"]),
    :global([class*="mdc-text-field"]),
    :global(.mdc-floating-label),
    :global(::placeholder)
    {
        caret-color: var(--theme--text) !important;
        color: var(--theme-text) !important;
    }

    :global([class*="mdc-list"]),
    :global([class*="mdc-drawer"]) {
        background-color: var(--theme-lighter-background);
    }

    :global(.mdc-chip),
    :global(.mdc-chip__text),
    :global(.mdc-chip__icon)
    {
        background-color: var(--theme-light-background) !important;
        color: var( --mdc-theme-primary) !important;
    }

    :global(.mdc-button__label){
        color: var(--theme-text);
    }

    :global(.mdc-tab--active){
        background-color: var(--mdc-theme-background) !important;
    }

    :global(:disabled){
        opacity: 0.5;
        color: var( --theme-text) !important;
    }

    :global(input.mdc-text-field__input){
        border-bottom-color: var(--theme-text) !important;
    }

    :global(.mdc-card__primary_action:hover){
        opacity: var(--theme-hover-opacity);
        background-color: var(--theme-hover-background);
    }
</style>
