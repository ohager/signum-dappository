<script>
    import Snackbar, { Actions, Label } from '@smui/snackbar'
    import IconButton from '@smui/icon-button'
    import { MessageTypes } from '../../utils/messageTypes'

    let message
    let type
    let snackbar

    function showError({ detail }) {
        showSnackbar(MessageTypes.Error, detail)
    }

    function showWarning({ detail }) {
        showSnackbar(MessageTypes.Warning, detail)
    }

    function showSuccess({ detail }) {
        showSnackbar(MessageTypes.Success, detail)
    }

    function showInformation({ detail }) {
        showSnackbar(MessageTypes.Information, detail)
    }

    function showSnackbar(t, msg){
        message = msg
        type = t
        snackbar.open()
    }

</script>

<style>
    .ml {
        margin-left: 1rem;
    }
    .mdc-typography--button.error {
        color: #DD2233 !important;
    }
    .mdc-typography--button.success {
        color: #2a9d00 !important;
    }
    .mdc-typography--button.warning {
        color: #f6b900 !important;
    }
    .mdc-typography--button.info {
        color: #008bf6 !important;
    }
</style>

<svelte:window
        on:error={showError}
        on:success={showSuccess}
        on:warning={showWarning}
        on:info={showInformation}
/>

<Snackbar leading bind:this={snackbar}>
    <span class={`mdc-typography--button ml ${type}`}>
        {type}
    </span>
    <Label>{message}</Label>
    <Actions>
        <IconButton class="material-icons" title="Dismiss">close</IconButton>
    </Actions>
</Snackbar>
