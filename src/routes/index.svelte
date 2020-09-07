<script context="module" >
    export async function preload({ params, query }) {
        return {
            searchText: query.q,
        }
    }
</script>

<script>
    import { goto, prefetch } from '@sapper/app'
    import TokenList from '../features/tokens/TokenList.svelte'
    import { RouteRegister } from '../utils/routes'
    import { account$ } from '../features/_common/accountStore'
    import { isEmptyString } from '../utils/isEmptyString'
    import { Events } from '../utils/events'
    import { dispatchEvent } from '../utils/dispatchEvent'
    import RegisterFabButton from '../features/_common/RegisterFabButton.svelte'

    export let searchText = ''

    $: accountId = $account$.accountId
    $: hasAccount = !isEmptyString(accountId)

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

<div>
    <TokenList {searchText} />
    <RegisterFabButton on:mouseenter={prefetchRoute} on:click={handleClick}/>
</div>

