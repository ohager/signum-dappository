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

    .donation__form {
        display: block;
        max-width: 600px;
        margin: 0 auto
    }

    .donation__header {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .donation__header img {
        height: 64px;
        width: 64px;
        padding-right: 1rem;
    }

</style>

<div class="donation">
    <Paper>
        <div class="header">
            <img src="/img/donation.svg" alt="donate">
            <h4 class="mdc-typography--headline4">
                Donate to
            </h4>
        </div>
        <div class="donation__form">
            <div class="donation__header">
                <img src={token.img} alt={`${token.name}-logo`}>
                <h4 class="mdc-typography--headline4">
                    {token.name}
                </h4>
            </div>
            <div class="donation__input">
                <TextField fullwidth bind:value={amount} label="Donation Amount"/>
            </div>
        </div>
    </Paper>
</div>
