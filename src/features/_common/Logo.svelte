<script>
    import { ThemeNames } from '../../utils/themeNames'

    export let height
    export let dark = false

    const logoPath = () => dark ? 'img/logo.svg' : 'img/logo.dark.svg'
</script>

<div class="logo" style="height: {height}">
    <img src={logoPath()} alt="The Burst dAppository"/>
</div>

<style>
    .logo img {
        height: 100%;
    }
</style>
