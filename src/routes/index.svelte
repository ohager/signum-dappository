<script>
    import ApplicationList from '../features/application/list/ApplicationList.svelte'
    import Fab, { Label, Icon } from '@smui/fab'
    import {goto, prefetch} from '@sapper/app'
    import { RouteRegister } from '../utils/routes'


    function handleGotoRegister(){
        goto(RouteRegister())
    }

    const prefetchRegister = () => {
        prefetch(RouteRegister())
    }


</script>

<style>
    .btn-register {
        position: fixed;
        bottom: 32px;
        right: 32px;
    }
</style>

<svelte:head>
    <title>Burst Applications</title>
</svelte:head>

<div>
    <ApplicationList/>
    <div class="btn-register">
        <Fab on:mouseenter={prefetchRegister}  on:click={handleGotoRegister} extended>
            <Icon class="material-icons">add_to_queue</Icon>
            <Label>Register</Label>
        </Fab>
    </div>
</div>

