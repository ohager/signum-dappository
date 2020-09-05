<script>
    import TutorialPage from './TutorialPage.svelte'
    import {TokenItem, TokenItemVariant} from '../../_common'

    const fakeToken = {
        account: '',
        name: 'ACME App',
        desc: 'The best ACME app ever',
        repo: '',
        img: '/img/donation.svg',
        lic: 'MIT',
        tags: ['finance'],
    }
</script>

<TutorialPage>
    <h1 class="mdc-typography--headline6">How donation works?</h1>

    <div class="container">
        <div class="card-preview">
            <TokenItem data={{...fakeToken, donationPlanck: '0'}} variant={TokenItemVariant.Preview}/>
            <div class="highlight animation-fading"></div>
        </div>
        <div class="description">
            <div class="mdc-typography--body1">
                As soon as a token is <em>active</em>, it appears in the main list. From this moment on, anyone who has a Burst
                account can send BURST to the token. The respective <b>owner automatically receives the amount</b> minus the execution
                costs for the Smart Contract (about 3 BURST) and a 1% commission for the maintainer of this project.
            </div>
            <div class="mdc-typography--body1">
                The contract stores the total amount and the number of all donations received.
                From these values a <b>Token Score</b> is determined. The more donations, the higher the score. The Token Score
                is considered as an indicator for an <b>applications popularity</b>.
            </div>
        </div>
    </div>
</TutorialPage>

<style>

    .container {
        display: flex;
        flex-direction: row;
    }

    .card-preview {
        position: relative;
        width: 240px;
        text-align: center;
        display: flex;
        flex-direction: row;
        margin-right: 1rem;
    }

    .card-preview .highlight {
        position: absolute;
        height: 32px;
        background: yellow;
        width: 76px;
        bottom: 42px;
        opacity: 0.5;
        border-radius: 4px;
        left: 8px;
    }

    .description {
        text-align: justify;
    }

    @media (max-width: 480px) {
        .container {
            flex-direction: column;
        }
        .card-preview {
            margin: auto;
        }

        .card-preview .highlight {
            bottom: 12px;
        }
    }

</style>
