<script>
    import Fab, { Label, Icon } from '@smui/fab'
</script>

<div class="btn-register">
    <Fab on:mouseenter
         on:click extended>
        <Icon class="material-icons">add_to_queue</Icon>
        <Label>Register</Label>
    </Fab>
</div>


<style>
    .btn-register {
        position: fixed;
        bottom: 32px;
        right: 32px;
    }
</style>
