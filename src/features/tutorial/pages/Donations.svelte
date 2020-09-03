<script>
    import TutorialPage from './TutorialPage.svelte'
</script>

<TutorialPage>
    <h1 class="mdc-typography--headline6">How donation works?</h1>
    <p class="mdc-typography--body1">
        As soon as a token is <em>active</em>, it appears in the main list. From this moment on, anyone who has a Burst
        account can send BURST to the token. The respective <b>owner automatically receives the amount</b> minus the execution
        costs for the Smart Contract (about 3 BURST) and a 1% commission for the maintainer of this project.
    </p>
    <p class="mdc-typography--body1">
        The contract stores the total amount and the number of all donations received.
        From these values a <b>Token Score</b> is determined. The more donations, the higher the score. The Token Score
        is considered as an indicator for an <b>applications popularity</b>.
    </p>
</TutorialPage>
