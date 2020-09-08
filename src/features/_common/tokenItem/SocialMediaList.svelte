<script>
    import { Email, HackerNews, Reddit, LinkedIn, Pinterest, Telegram, Tumblr, Vk, WhatsApp, Xing, Facebook, Twitter } from 'svelte-share-buttons-component';
    import { isClientSide } from '../../../utils/isClientSide'

    export let token = {
        at: '',
        name: '',
        desc: '',
        repo: '',
        img: null,
        tags: [],
        donationPlanck: '0',
        isActive: true,
    }

    const title = `dAppository: ${token.name}`
    const text = `This "${token.name}" is hot 🔥 stuff! Check it out!`
    const url = isClientSide() ? `${location.origin}?q=${token.at}` : ''
</script>

<div class="container">
    <HackerNews class="share-button" {title} {url} />
    <Reddit class="share-button" {title} {url} />
    <LinkedIn class="share-button" {url} />
    <Tumblr class="share-button" {title} {url} caption={title} />
    <Telegram class="share-button" {text} {url} />
    <WhatsApp class="share-button" {text} />
    <Twitter class="share-button" {text} {url} />
</div>


<style>
    .container {
        display: flex;
        flex-direction: row;
    }
</style>
