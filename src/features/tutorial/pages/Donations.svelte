<script>
    import { TokenContract } from '../../../context'
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
                The tokens main feature is receiving donations. Anyone who has a Signum account
                can send SIGNA to that token. The <b>owner automatically receives the amount</b>
                minus {TokenContract.ActivationCosts} SIGNA and a 1% commission. While the commission goes to the maintainer of this project,
                the {TokenContract.ActivationCosts} SIGNA remains in the token to pay the execution costs and raising the tokens value.
                Only <b>on deactivation the remaining balance will be transferred to the owner</b>.
                <br/>
                Each received donation raises not only the tokens value, but also the <b>tokens score</b>.
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
