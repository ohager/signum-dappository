<script>
    import Tab, { Icon, Label } from '@smui/tab'
    import TabBar from '@smui/tab-bar'
    import Button from '@smui/button'
    import { goto } from '@sapper/app'
    import { RouteHome } from '../../../utils/routes'
    import TabAccount from './TabAccount.svelte'
    import TabApplicationInfo from './TabApplicationInfo.svelte'
    import TabContent from '../../../components/TabContent.svelte'

    const TabNames = {
        Account: 'Account',
        AppInfo: 'Application Info',
        Confirm: 'Confirm',
    }

    const Tabs = [
        TabNames.Account,
        TabNames.AppInfo,
        TabNames.Confirm,
    ]

    let active = TabNames.Account
    let isInvalid = false

    $: currentTabIndex = Tabs.indexOf(active)
    $: isFirstTab = currentTabIndex === 0
    $: isLastTab = currentTabIndex === Tabs.length - 1

    function handleCancel() {
        goto(RouteHome())
    }

    function handleRegister() {
        console.log('registering')
    }

    function handleNext() {
        const nextIndex = Math.min(currentTabIndex + 1, Tabs.length - 1)
        active = Tabs[nextIndex]

        console.log(active, nextIndex)
    }

    function handlePrevious() {
        const prevIndex = Math.max(currentTabIndex - 1, 0)
        active = Tabs[prevIndex]
    }

</script>

<style>
    .creation__form {
        display: block;
        max-width: 600px;
        margin: 0 auto
    }

    .form--input {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 1rem;
    }

    .creation__form--footer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 2rem;
    }

    .form--input-field {
        display: block;
        width: 100%;
    }

    :global(.mdc-text-field) {
        width: 100% !important;
    }

</style>

<div class="creation__form">
    <div class="creation__form--header">
        <h4 class="mdc-typography--headline4">
            Register New Application
        </h4>
    </div>
    <TabBar tabs={Tabs} let:tab bind:active>
        <!-- Notice that the `tab` property is required! -->
        <Tab {tab}>
            <Label>{tab}</Label>
        </Tab>
    </TabBar>
    <!-- TODO: License Field -->

    <TabContent>
        {#if active === TabNames.Account}
            <TabAccount/>
        {:else if active === TabNames.AppInfo}
            <TabApplicationInfo/>
        {:else if active === TabNames.Confirm}
            <p>Confirm</p>
        {/if}
    </TabContent>

    <div class="creation__form--footer">
        <Button on:click={handleCancel}>
            <Label>Cancel</Label>
        </Button>
        {#if !isFirstTab}
            <Button on:click={handlePrevious} disabled={isInvalid}>
                <Label>Previous</Label>
            </Button>
        {/if}
        {#if isLastTab}
            <Button on:click={handleRegister} disabled={isInvalid}>
                <Label>Register</Label>
            </Button>
        {:else}
            <Button on:click={handleNext} disabled={isInvalid}>
                <Label>Next</Label>
            </Button>
        {/if}

    </div>
</div>

