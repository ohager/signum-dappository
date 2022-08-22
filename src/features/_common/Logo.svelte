<script>
    export let height
    export let dark = false

    $: src = dark ? 'img/logo.black.svg' : 'img/logo.white.svg'
</script>

<div class="logo" style="height:{height}">
    <img {src} alt="The Signum dAppository" role="img" />
</div>

<style>
    .logo img {
        height: 100%;
    }


</style>
