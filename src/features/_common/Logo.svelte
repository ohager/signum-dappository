<script>
    export let height
    export let dark = false

    $: src = dark ? 'img/logo.black.svg' : 'img/logo.white.svg'
</script>

<div class="logo" style="height:{height}">
    <img {src} alt="The Burst dAppository" />
</div>

<style>
    .logo img {
        height: 100%;
    }
</style>
