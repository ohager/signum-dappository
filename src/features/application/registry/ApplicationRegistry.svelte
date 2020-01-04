<script>
    import Page from '../../../components/Page.svelte'
    import ApplicationRegistryForm from './ApplicationRegistryForm.svelte'
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
        <img src="/img/donation.svg" alt="register">
    </div>
    <ApplicationRegistryForm />
</Page>
