<script>
	import { goto, prefetch } from "@sapper/app";
	import TokenList from "../features/tokens/TokenList.svelte";
	import { RouteRegister } from "../utils/routes";
	import { account$ } from "../features/_common/accountStore";
	import { isEmptyString } from "../utils/isEmptyString";
	import { Events } from "../utils/events";
	import { dispatchEvent } from "../utils/dispatchEvent";
	import RegisterFabButton from "../features/_common/RegisterFabButton.svelte";
	import { getUrlQuery } from "../utils/getUrlQuery";
	import GenericMetaHead from "../features/_common/GenericMetaHead.svelte";

	// need to use like SPA and not SSR (due to sapper export)
	let query = getUrlQuery();

	$: accountId = $account$.accountId;
	$: hasAccount = !isEmptyString(accountId);
	$: searchText = query.q || "";

	function handleClick() {
		if (hasAccount) {
			goto(RouteRegister(accountId));
		} else {
			dispatchEvent(Events.ShowAccountDialog, { isVisible: true, wantsRegister: true });
		}
	}

	const prefetchRoute = () => {
		if (hasAccount) {
			prefetch(RouteRegister(accountId));
		}
	};
</script>

<GenericMetaHead/>
<div>
    <TokenList {searchText} />
    <RegisterFabButton on:mouseenter={prefetchRoute} on:click={handleClick}/>
</div>

