<script>
    import Snackbar, { Actions, Label } from '@smui/snackbar'
    import IconButton from '@smui/icon-button'
    import { MessageTypes } from '../../utils/messageTypes'

    let message
    let type
    let snackbar

    async function showError({ detail }) {
        await showSnackbar(MessageTypes.Error, detail)
    }

    async function showWarning({ detail }) {
        await showSnackbar(MessageTypes.Warning, detail)
    }

    async function showSuccess({ detail }) {
        await showSnackbar(MessageTypes.Success, detail)
    }

    async function showInformation({ detail }) {
        await showSnackbar(MessageTypes.Information, detail)
    }

    async function showSnackbar(t, msg){
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
    <span class='mdc-snackbar__label'>
        {message}
    </span>
    <!-- this lable is buggy - its not updating correctly -->
    <Label></Label>
    <Actions>
        <IconButton class="material-icons" title="Dismiss">close</IconButton>
    </Actions>
</Snackbar>
