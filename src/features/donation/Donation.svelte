<script>
    import Paper from '@smui/paper'
    import TextField from '@smui/textfield'
    import { beforeUpdate } from 'svelte'

    export let token = {
        at: '',
        name: '',
        img: '',
    }


    let amount = ''

    // $: formattedAmount = formatter.format(amount)

    beforeUpdate(() => {
        // console.log(formattedAmount)
    })
</script>

<style>
    .donation {
        margin: 0 auto;
        max-width: 80%;
    }
    @media (max-width: 480px) {
        .donation {
            max-width: 100%;
        }
    }

    h4 {
        margin: 0.5rem
    }

    .donation__header {
        text-align: center;
        margin-bottom: 1rem;
    }

    .donation__header img {
        height: 96px;
        width: 96px;
        text-align: center;
    }

    .donation__form {
        display: block;
        max-width: 600px;
        margin: 0 auto
    }

    .donation__form--header {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 1rem;
    }

    .donation__form--header img {
        height: 64px;
        width: 64px;
        padding-right: 1rem;
    }

    .donation__form--input {
        display: flex;
        align-items: flex-end;
    }

    :global(.mdc-text-field__input) {
        font-size: 2rem !important;
    }

    :global(.mdc-text-field) {
        width: 100% !important;
    }

</style>

<div class="donation">
    <Paper>
        <div class="donation__header">
            <img src="/img/donation.svg" alt="donate">
        </div>
        <div class="donation__form">
            <div class="donation__form--header">
                <img src={token.img} alt={`${token.name}-logo`}>
                <h4 class="mdc-typography--headline4">
                    {token.name}
                </h4>
            </div>
            <div class="donation__form--input">
                <TextField bind:value={amount} label="Donation Amount"/>
                <span class="mdc-typography--headline6">BURST</span>
            </div>
        </div>
    </Paper>
</div>
