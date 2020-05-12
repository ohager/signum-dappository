<script>
    // TODO: use context to inject config for dev and prod
    import ApplicationList from '../features/application/list/ApplicationList.svelte'
    import { goto, prefetch } from '@sapper/app'
    import { RouteRegister, RouteAccountTokens } from '../utils/routes'
    import { account$ } from '../features/account/accountStore'
    import { isEmptyString } from '../utils/isEmptyString'
    import { Events } from '../utils/events'
    import { dispatchEvent } from '../utils/dispatchEvent'
    import RegisterFabButton from '../components/RegisterFabButton.svelte'

    $: accountId = $account$.accountId
    $: hasAccount = !isEmptyString(accountId)

    function handleClick() {
        if (hasAccount) {
            goto(RouteAccountTokens(accountId, true))
        } else {
            dispatchEvent(Events.ShowAccountDialog, true)
        }
    }

    const prefetchRoute = () => {
        if (hasAccount) {
            prefetch(RouteAccountTokens(accountId))
        }
    }


</script>

<svelte:head>
    <title>Burst Applications</title>
</svelte:head>

<div>
    <ApplicationList/>
    <RegisterFabButton on:mouseenter={prefetchRoute} on:click={handleClick}/>
</div>

