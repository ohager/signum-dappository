<script>
    import ApplicationList from '../features/application/ApplicationList.svelte'
    import Fab, { Label, Icon } from '@smui/fab'
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
        <Fab on:click={() => console.log('clicked')} extended>
            <Icon class="material-icons">add_to_queue</Icon>
            <Label>Register</Label>
        </Fab>
    </div>
</div>

