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
    <h1 class="mdc-typography--headline6">What is the Token Score?</h1>

    <div class="container">
        <div class="description">
            <div class="mdc-typography--body1">
                The contract stores the total amount and the number of all donations received.
                From these values a <b>Token Score</b> is determined. The more donations, the higher the score. The Token Score
                is considered as an indicator for an <b>applications popularity</b>.
            </div>
            <div class="mdc-typography--body1">
                Additionally, a token could earn <b>badges</b>. There are many different kind of badges, some based upon the score,
                others are time and/or event based, and others may apply to other rules. And new badges will be added in the future.
            </div>
        </div>
        <div class="center">
            <div class="banner">
                <img src="/img/badges/banner.svg" alt="Token Score Banner"/>
                <small class="score">1785</small>
            </div>
            <img class="animation-pulse" src="/img/badges/top5.svg" alt="Top5 Badge"/>
        </div>
    </div>
</TutorialPage>

<style>

    .container {
        display: flex;
        flex-direction: column;
    }

    .description {
        text-align: justify;
    }

    .center {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-top: 1rem;
    }

    .center .banner {
        position: relative;
        margin-right: 1rem;
        animation: waving 4s infinite alternate-reverse ease-in-out;
    }

    .center .banner .score {
        position: absolute;
        left: calc(50% - 15px);
        top: 18px;
    }

    .center img {
        width: 64px;
    }

    @keyframes waving {
        0% {
            transform: rotate(-15deg);
        }
        50% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(15deg);
        }
    }

</style>
