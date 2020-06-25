<script>
    import { goto } from '@sapper/app'
    import Button, { Label } from '@smui/button'
    import Page from '../../components/Page.svelte'
    import ApplicationItem from '../application/list/ApplicationItem.svelte'
    import { ApplicationItemVariant } from '../application/list/constants'
    import { TokenContract } from '../../services/tokenContract'
    import { EmptyToken } from '../../utils/emptyToken'
    import { burstFee$ } from '../burstFeeStore'
    import { BurstValue } from '@burstjs/util'
    import { isEmptyString } from '../../utils/isEmptyString'
    import PassphraseInput from '../../components/PassphraseInput.svelte'
    import { account$ } from '../account/accountStore'
    import { applicationTokenService } from '../../services/applicationTokenService'
    import { RouteAccountTokens } from '../../utils/routes'

    export let token = EmptyToken
    let isPassphraseValid = false
    let passphrase = ''

    function handleCancel() {
        history.back()
    }

    function handleDeactivate() {
        applicationTokenService
                .deactivateToken(token, passphrase)
                .then(() => {
                    goto(RouteAccountTokens($account$.accountId))
                })
    }

</script>


<Page>
    <div class="header">
        <img src="/img/deactivation.svg" alt="activate">
    </div>
    <div class="form">
        <div class="form--header">
            <article class="description">
                <p class="mdc-typography--body1">
                    Do you really want to <b>deactivate</b> your App Token?
                </p>
                <p class="mdc-typography--body1">
                    Once deactivated, you cannot reactivate the token, receive donations or transfer it.
                    In addition, it is no longer listed in the general overview.
                    Any remaining balance of the token will be credited to your account in full.
                </p>
                <p class="mdc-typography--body1">
                    This action turns your token worthless and is irrevocable.
                    Mind that you'll be charged a small fee for contract execution.
                </p>
            </article>
            <div class="item-wrapper">
                <ApplicationItem data={token} variant={ApplicationItemVariant.NoActions}/>
            </div>
        </div>

        <PassphraseInput account={$account$.accountId} bind:valid={isPassphraseValid} bind:passphrase={passphrase}/>

        <div class="form--footer">
            <Button on:click={handleCancel}>
                <Label>Back</Label>
            </Button>

            <Button on:click={handleDeactivate} disabled={!isPassphraseValid}>

                <Label>Deactivate</Label>
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

    .form--header > .description {
        text-align: justify;
        width: 50%;
        margin: 0;
    }

    .form--header p:first-child {
        margin: 0;
    }

    .form--header p {
        margin: 0.5rem 0 0;
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

        .form--header p {
            width: 100%;
        }

        .form--header > .item-wrapper {
            margin: 1rem 0;
            width: 100%;
        }
    }

</style>
