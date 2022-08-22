<script>
    import TutorialPage from './TutorialPage.svelte'
    import RegisterFabButton from '../../_common/RegisterFabButton.svelte'
</script>

<TutorialPage>
    <h1 class="mdc-typography--headline6">How to create a token?</h1>
    <div class="container">
        <div class="highlight animation-growing">
            <RegisterFabButton />
        </div>
        <p class="mdc-typography--body1">
            To create a token, an <b>active Signum account</b> (creator account) with a few SIGNA (15 SIGNA are quite
            sufficient)
            is required. The process is divided into <b>two phases: Registration and Activation</b>. The whole process,
            taking into
            account the confirmation from the Signum network, takes about 10 minutes. The process is as follows:
        </p>
        <ol class="mdc-typography--body1">
            <li>
                to register you must "login" with your creator account, that will receive the donations later
            </li>
            <li>
                fill in the form as completely as possible and confirm the process with your secret passphrase
            </li>
            <li>
                wait until the registration is completed (about 4 minutes)
            </li>
            <li>
                finally, activate the token. That means you have to send a small amount (5 SIGNA) to the token
            </li>
        </ol>
        <p class="mdc-typography--body1">
            Once activated, the token becomes publicly visible and can receive donations.
        </p>
    </div>
</TutorialPage>

<style>
    .container {
    }

    .highlight {
        position: relative;
        top: 16px;
        transform-origin: center;
    }


</style>
