<script>
    import { goto } from '@sapper/app'
    import Button, { Label } from '@smui/button'
    import { Page, TokenItem, TokenItemVariant, PassphraseInput } from '../_common'
    import { EmptyToken } from '../../utils/emptyToken'
    import { account$ } from '../_common/accountStore'
    import { applicationTokenService } from '../../services/applicationTokenService'
    import { RouteAccountTokens } from '../../utils/routes'
    import { tokenMonitorService } from '../../services/tokenMonitorService'
    import {xtWallet$} from "../_common/xtWalletStore";

    export let token = EmptyToken
    let isPassphraseValid = false
    let passphrase = ''

    $: wallet = $xtWallet$.wallet
    $: isOwner = $account$.accountId === token.owner
    $: isDisabled = (!wallet && !passphrase) || (!isOwner)

    function handleCancel() {
        history.back()
    }

    async function handleDeactivate() {
        await applicationTokenService.deactivateToken(token, wallet || passphrase)
        await tokenMonitorService.startMonitor({
            tokenId: token.at,
            expectedValue: false,
            fieldName: 'isActive',
        })
        goto(RouteAccountTokens($account$.accountId))
    }

</script>


<Page>
    <div class="header">
        <img src="/img/deactivation.svg" alt="deactivate token">
        <div class="mdc-typography--headline6">Deactivate Token</div>
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
                <TokenItem data={token} variant={TokenItemVariant.NoActions}/>
            </div>
        </div>

        {#if !wallet}
        <PassphraseInput account={$account$.accountId} bind:valid={isPassphraseValid} bind:passphrase={passphrase}/>
        {/if}

        <div class="form--footer">
            <Button on:click={handleCancel}>
                <Label>Back</Label>
            </Button>

            <Button on:click={handleDeactivate} disabled={isDisabled}>
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
