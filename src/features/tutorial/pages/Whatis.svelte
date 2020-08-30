<script>
    import {fade, fly} from 'svelte/transition'
</script>

<div in:fly="{{ y: 400, duration: 500 }}">
    <h1>What Is</h1>
</div>
