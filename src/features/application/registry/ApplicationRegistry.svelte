<script>
    import Page from '../../../components/Page.svelte'
    import ApplicationRegistryForm from './ApplicationRegistryForm.svelte'
    import ApplicationRegistryTabForm from './ApplicationRegistryTabForm.svelte'
</script>
<style>
    .creation__header {
        text-align: center;
        margin-bottom: 1rem;
    }

    .creation__header img {
        height: 96px;
        width: 96px;
        text-align: center;
    }

</style>

<Page>
    <div class="creation__header">
        <img src="/img/registration.svg" alt="registration">
    </div>
    <ApplicationRegistryTabForm />
</Page>
