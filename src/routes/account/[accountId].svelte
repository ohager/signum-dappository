<script context="module">
    export async function preload({ params, query }) {
        const { accountId } = params
        const { register = false } = query
        return { accountId, register }
    }
</script>

<script>
    import { onMount } from "svelte";
    import { goto, prefetch } from "@sapper/app";
    import { RouteRegister } from "../../utils/routes";
    import AccountTokenList from "../../features/account/AccountTokenList.svelte";
    import { RegisterFabButton, GenericMetaHead } from "../../features/_common";

    function redirectToRegister() {
        goto(RouteRegister());
    }

    const prefetchRegisterRoute = () => {
        prefetch(RouteRegister());
    };

    export let accountId;
    export let register;

    onMount(() => {
        if (register) {
            redirectToRegister();
        }
    });

</script>

<GenericMetaHead/>
<div>
    <AccountTokenList {accountId}/>
    <RegisterFabButton on:mouseenter={prefetchRegisterRoute} on:click={redirectToRegister}/>
</div>
