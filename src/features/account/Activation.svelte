<script>
    import { goto } from '@sapper/app'
    import Button, { Label } from '@smui/button'
    import { Page, TokenItem, TokenItemVariant, burstFeeStore, PassphraseInput, PaymentQrCode } from '../_common'
    import { TokenContract } from '../../services/tokenContract'
    import { EmptyToken } from '../../utils/emptyToken'
    import { BurstValue } from '@burstjs/util'
    import { isEmptyString } from '../../utils/isEmptyString'
    import { TokenStateMonitor } from '../../services/TokenStateMonitor'
    import { tokenMonitorService } from '../../services/tokenMonitorService'

    export let token = EmptyToken

    const { burstFee$ } = burstFeeStore
    async function startMonitoring() {
        await tokenMonitorService.startMonitor({
            tokenId: token.at,
            expectedValue: true,
            fieldName: 'isActive',
        })
    }

    async function handleCancel() {
        history.back()
    }

    async function handlePaid() {
        await startMonitoring()
        history.back()
    }

    function getCosts() {
        return [['Activation Costs', BurstValue.fromBurst(TokenContract.ActivationCosts)]]
    }

</script>


<Page>
    <div class="header">
        <img src="/img/activation.svg" alt="activate">
        <div class="mdc-typography--headline6">Activate Token</div>
    </div>
    <div class="form">
        <div class="form--header">
            <p class="mdc-typography--body1">
                Before you can receive your first donations, the token must first be activated. Unfortunately there is a
                small fee for this, but it is not too much. Mind that the activation may take a few moments. Good luck
                with your app.
            </p>
            <div class="item-wrapper">
                <TokenItem data={token} variant={TokenItemVariant.NoActions}/>
            </div>
        </div>

        {#if !isEmptyString(token.at)}
            <PaymentQrCode
                    costs={getCosts()}
                    fee={$burstFee$}
                    recipient={token.at}
            />
        {/if}

        <div class="form--footer">
            <Button on:click={handleCancel}>
                <Label>Back</Label>
            </Button>
            <Button on:click={handlePaid}>
                <Label>Payment Done</Label>
            </Button>
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
