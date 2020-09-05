<script>
    import Page from './Page.svelte'
</script>

<Page>
    <div class="maintenance-container">
    <div class="header">
        <img src="/img/gear.svg" alt="donate">
        <div class="mdc-typography--headline6">Maintenance</div>
    </div>
    <p>
        We are currently working on improvements. Please be patient and visit us again soon.
    </p>
    </div>
</Page>


<style>
    .maintenance-container {
        text-align: center;
    }

    .header {
        text-align: center;
        margin-bottom: 1rem;
    }

    .header img {
        height: 96px;
        width: 96px;
        text-align: center;
    }
</style>
