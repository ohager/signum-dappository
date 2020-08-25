<script>
    import Page from '../_common/Page.svelte'
    export let token
</script>

<Page>
   <h1>{JSON.stringify(token)}</h1>
</Page>
