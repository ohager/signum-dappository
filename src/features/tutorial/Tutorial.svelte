<script>
    import { goto } from '@sapper/app'
    import Button, { Label } from '@smui/button'
    import Page from '../_common/Page.svelte'
    import { WhatIs, Donations, TokenCreation, AccountZone, TokenScore } from './pages'
    import { RouteHome } from '../../utils/routes'

    let pages = [WhatIs, Donations, TokenScore, AccountZone, TokenCreation]
    let currentPage = 0

    $: hasFinished = currentPage === pages.length - 1

    function handleBack(){
        if(currentPage === 0){
            return goto(RouteHome())
        }
        currentPage = Math.max(--currentPage, 0)
    }

    function handleNext() {
        if(hasFinished){
            return goto(RouteHome())
        }
        currentPage = Math.min(++currentPage, pages.length - 1)
    }


</script>

<Page>
    <div class="header">
        <img src="/img/tutorial.svg" alt="activate">
        <div class="mdc-typography--headline6">Tutorial</div>
    </div>
    <div class="form">
        <div class="content">
            <svelte:component this={pages[currentPage]}/>
        </div>
        <div class="dots">
            {#each pages as page, index}
                <div class="dot" class:active={currentPage === index}></div>
            {/each}
        </div>
        <div class="form--footer">
            <Button on:click={handleBack}>
                <Label>{currentPage===0 ? "Home" : "Back"}</Label>
            </Button>
            <Button on:click={handleNext}>
                <Label>{hasFinished ? "Finish" : "Next"}</Label>
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

    .content {
        display: flex;
        flex-direction: row;
        overflow: hidden;
    }
    .dots {
        width: 50%;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        padding-top: 0.5rem ;
    }

    .dots .dot{
        height: 8px;
        width: 8px;
        background-color: transparent;
        border: 1px solid var(--mdc-theme-secondary);
        border-radius: 50%;
        transition: all 250ms ease-in-out;
    }

    .dots .dot.active{
        background-color: var(--theme-light-background);
        transition: all 250ms ease-in-out;
    }

    .form--footer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 2rem;
    }

</style>
