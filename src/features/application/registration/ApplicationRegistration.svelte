<script>
    import Page from '../../../components/Page.svelte'
    import ApplicationRegistrationTabForm from './ApplicationRegistrationTabForm.svelte'
</script>
<style>
    .registration__header {
        text-align: center;
        margin-bottom: 1rem;
    }

    .registration__header img {
        height: 96px;
        width: 96px;
        text-align: center;
    }
</style>

<Page>
    <div class="registration__header">
        <img src="/img/registration.svg" alt="registration">
    </div>
    <ApplicationRegistrationTabForm />
</Page>
