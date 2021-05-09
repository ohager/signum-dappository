<script>
    import { goto, prefetch } from '@sapper/app'
    import TokenList from '../features/tokens/TokenList.svelte'
    import { RouteRegister } from '../utils/routes'
    import { account$ } from '../features/_common/accountStore'
    import { isEmptyString } from '../utils/isEmptyString'
    import { Events } from '../utils/events'
    import { dispatchEvent } from '../utils/dispatchEvent'
    import RegisterFabButton from '../features/_common/RegisterFabButton.svelte'
    import { getUrlQuery } from '../utils/getUrlQuery'

    // need to use like SPA and not SSR (due to sapper export)
    let query = getUrlQuery()

    $: accountId = $account$.accountId
    $: hasAccount = !isEmptyString(accountId)
    $: searchText = query.q || ''

    function handleClick() {
        if (hasAccount) {
            goto(RouteRegister(accountId))
        } else {
            dispatchEvent(Events.ShowAccountDialog, { isVisible: true, wantsRegister: true })
        }
    }

    const prefetchRoute = () => {
        if (hasAccount) {
            prefetch(RouteRegister(accountId))
        }
    }
</script>

<svelte:head>
    	<!-- Google / Search Engine Tags -->
    	<meta itemprop="name" content="The Burst dAppository">
    	<meta itemprop="description" content="">
    	<meta itemprop="image" content="https://raw.githubusercontent.com/ohager/burst-dappository/develop/static/img/logo.black.svg">

    	<!-- Facebook Meta Tags -->
    	<meta property="og:type" content="website">
    	<meta property="og:title" content="The Burst dAppository">
    	<meta property="og:description" content="The Burst dAppository is the place to find tools, apps, and more resources for the Burstcoin Ecosystem.">
    	<meta property="og:image" content="https://raw.githubusercontent.com/ohager/burst-dappository/develop/static/img/logo.black.png">

    	<!-- Twitter Meta Tags -->
    	<meta name="twitter:card" content="summary_large_image">
    	<meta name="twitter:title" content="The Burst dAppository">
    	<meta name="twitter:description" content="The Burst dAppository is the place to find tools, apps, and more resources for the Burstcoin Ecosystem.">
    	<meta name="twitter:image" content="https://raw.githubusercontent.com/ohager/burst-dappository/develop/static/img/logo.black.png">
</svelte:head>

<div>
    <TokenList {searchText} />
    <RegisterFabButton on:mouseenter={prefetchRoute} on:click={handleClick}/>
</div>

