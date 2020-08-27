<script>
    import { goto } from '@sapper/app'
    import Button, { Label } from '@smui/button'
    import { Page, TokenItem, TokenItemVariant, burstFeeStore, PassphraseInput, PaymentQrCode } from '../_common'
</script>

<Page>
    <div class="header">
        <img src="/img/gear.svg" alt="about">
        <div class="mdc-typography--headline6">About</div>
    </div>
    <div class="form">
        <div class="form--header">
            <p class="mdc-typography--body1">
                To Do
            </p>
        </div>
    </div>
</Page>


<style>

    .header {
        text-align: center;
        margin-bottom: 1rem;
    }

    .header img {
        height: 96px;
        width: 96px;
        text-align: center;
    }

    .form {
        display: block;
        max-width: 600px;
        margin: 0 auto
    }

    .form--header {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        margin-bottom: 2rem;
    }

    .form--header > p {
        text-align: justify;
        width: 50%;
        margin: 0;
    }

    .form--header > .item-wrapper {
        margin-left: 1rem;
        width: 50%;
    }

    .form--footer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 2rem;
    }

    @media (max-width: 480px) {
        .form--header {
            flex-direction: column;
        }

        .form--header > p {
            width: 100%;
        }

        .form--header > .item-wrapper {
            margin: 1rem 0;
            width: 100%;
        }
    }

</style>
