<script>
    import { isEmptyString } from '../../../utils/isEmptyString'
    export let text = ''
    export let name = '' // still unused:sun
    export let description = ''
    export let icon = ''
    export let textStyle = ''
    export let size = 'normal' // small, normal, large, larger

    const Widths = {
        small: 24,
        normal: 32,
        large: 48,
        larger: 64,
    }
</script>

<div class='badge' title={description}>
    {#if !isEmptyString(text)}
        <small style={textStyle}>{text}</small>
    {/if}
    <img width={Widths[size]} src={`/img/badges/${icon}`} alt="{description}">
</div>


<style>
    .badge {
        position: relative;
    }
    .badge small {
        position: absolute;
        width: 100%;
        text-align: center;
    }
</style>
