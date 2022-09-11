<script>
  import {registration$} from './registrationStore'
  import {assureAccountId} from '../../utils/assureAccountId'
  import {onMount} from 'svelte'
  import {accountService} from '../../services/accountService'
  import {TokenContract} from '../../context'
  import AccountInput from '../_common/AccountInput.svelte'
  import {Amount} from "@signumjs/util";

  export let accountId = ''

  let validation = {
    message: 'Account is required',
    valid: false,
  }

  onMount(() => {
    $registration$.account = accountId
  })

  async function getBalance(account) {
    const accountId = assureAccountId(account)
    return await accountService.getBalance(accountId)
  }

  async function validateAccount(account) {
    const balance = await getBalance(account)
    const minimumBalance = TokenContract.CreationFee.clone().add(Amount.fromSigna(TokenContract.ActivationCosts + 1))
    if (!balance.greaterOrEqual(minimumBalance)) {
      throw new Error(`Insufficient Balance (${balance.toString()}): You need at least ${minimumBalance.toString()}`)
    }
  }

</script>

<section>
    <p class="mdc-typography--body1">
        In order to register your application, you must provide a Signum account to which donations will be forwarded.
        You will also have to pay a fee of {TokenContract.ActivationCosts} SIGNA to create the token. This fee is
        used exclusively to create the token and no third party will receive anything.
    </p>
    <AccountInput bind:account={$registration$.account}
                  bind:valid={validation.valid}
                  validate={validateAccount}
    />
</section>

<style>
    :global(.mdc-text-field__icon.material-icons.green) {
        color: green !important;
    }
</style>
