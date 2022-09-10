<script>
    import TutorialPage from './TutorialPage.svelte'
</script>


<TutorialPage>
    <h1 class="mdc-typography--headline6">What is the Account Zone?</h1>
    <div class="container">
        <div class="center animation-pulse">
            <img src="/img/login.svg" alt="Account Zone">
        </div>
        <div class="description">
            <div class="mdc-typography--body1">
                The Account Zone only shows the tokens of the creator. This also includes inactive tokens. Basically the
                Account Zone is <b>public</b>, i.e. everybody can view the tokens of a creator.
            </div>
            <div class="mdc-typography--body1">
                However, to use the <b>Activate</b>, <b>Deactivate</b> and <b>Transfer</b> functions, the private
                passphrase must be entered.
            </div>
            <ol class="mdc-typography--body1">
                <li>
                    <b>Activate</b>: Makes the contract publicly visible
                </li>
                <li>
                    <b>Deactivate</b>: This can be considered as <em>irrevocable retirement</em> of the token.
                    All remaining funds are transferred to the owner and no more action is possible.
                </li>
                <li>
                    <b>Transfer</b>: That way the ownership can be transferred to another person. Once transferred
                    all <em>donations will be redirected to the new owner</em>. The previous owner won't be refunded and has
                    no control over the token anymore.
                </li>
            </ol>
        </div>
    </div>
</TutorialPage>


<style>
    .container {
        text-align: justify;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .center {
        text-align: center;
    }

    .center > img {
        height: 80px;
    }


    @media (max-width: 480px) {
        .container {
            flex-direction: column;
        }
    }
</style>
