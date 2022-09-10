<script>
    import { goto } from '@sapper/app'
    import Button, { Label } from '@smui/button'
    import {Page, TokenItemVariant, TokenItem, PassphraseInput, AccountInput} from '../_common'
    import { applicationTokenService } from '../../services/applicationTokenService'
    import { EmptyToken } from '../../utils/emptyToken'
    import { account$ } from '../_common/accountStore'
    import { RouteAccountTokens } from '../../utils/routes'
    import { tokenMonitorService } from '../../services/tokenMonitorService'
    import { assureAccountId } from '../../utils/assureAccountId'
    import {xtWallet$} from "../_common/xtWalletStore";

    export let token = EmptyToken
    let isPassphraseValid = false
    let isAccountValid = false
    let targetAccount = ''
    let passphrase = ''

    $: wallet = $xtWallet$.wallet
    $: ownerId = $account$.accountId
    $: isOwner = $account$.accountId === token.owner
    $: canTransfer = isOwner && (wallet ? isAccountValid : isAccountValid && isPassphraseValid)


    function handleCancel() {
        history.back()
    }

    async function handleTransfer() {
        const targetAccountId = assureAccountId(targetAccount)
        await applicationTokenService.transferToken(token, wallet || passphrase, targetAccountId)
        await tokenMonitorService.startMonitor({
            tokenId: token.at,
            expectedValue: targetAccountId,
            fieldName: 'owner',
        })
        goto(RouteAccountTokens(ownerId))
    }

    function validateAccount(accountId) {
        return new Promise(((resolve, reject) => {
            if (ownerId !== accountId) {
                resolve()
            } else {
                reject('Accounts must not be equal')
            }
        }))
    }

</script>


<Page>
    <div class="header">
        <img src="/img/transfer.svg" alt="transfer token">
        <div class="mdc-typography--headline6">Transfer Token</div>
    </div>
    <div class="form">
        <div class="form--header">
            <article class="description">
                <p class="mdc-typography--body1">
                    Do you really want to <b>transfer</b> your App Token?
                </p>
                <p class="mdc-typography--body1">
                    This means that you no longer own and/or control the token. You will not receive any more donations for the token and you will not be able to deactivate it. The existing balance will not be paid to you and will be transferred to the new owner.
                </p>
                <p class="mdc-typography--body1">
                    This action is irrevocable.
                    Mind that you'll be charged a small fee for contract execution.
                </p>
            </article>
            <div class="item-wrapper">
                <TokenItem data={token} variant={TokenItemVariant.NoActions}/>
            </div>
        </div>

        <AccountInput bind:account={targetAccount}
                      bind:valid={isAccountValid}
                      validate={validateAccount}
        />

        {#if !wallet}
        <PassphraseInput bind:valid={isPassphraseValid}
                         bind:passphrase={passphrase}
                        account={$account$.accountId}
        />
        {/if}

        <div class="form--footer">
            <Button on:click={handleCancel}>
                <Label>Back</Label>
            </Button>

            <Button on:click={handleTransfer} disabled={!canTransfer}>
                <Label>Transfer</Label>
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
