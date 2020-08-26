<script>
    export let text = ''
    export let icon = ''
    export let size = 'normal' // small, normal, large, larger

    const Widths = {
        small: 24,
        normal: 32,
        large: 48,
        larger: 64,
    }
</script>

<div class='badge' title={text}>
    <img width={Widths[size]} src={`/img/badges/${icon}.svg`} alt="{text}">
</div>


<style>
    .badge {

    }
</style>
