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
                The tokens main feature is receiving donations, i.e. anyone who has a Burst account
                can send BURST to that token. The respective <b>owner automatically receives the amount</b>
                minus the execution costs for the Smart Contract (less than 0.4 BURST) and a 1% commission
                for the maintainer of this project.
                <br/>
                Each received donation raises the <b>tokens score</b>. This feature will be explained next.
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
        padding-bottom: 1rem;
    }

    .card-preview .highlight {
        position: absolute;
        height: 32px;
        background: yellow;
        width: 76px;
        bottom: 26px;
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
    }

</style>
