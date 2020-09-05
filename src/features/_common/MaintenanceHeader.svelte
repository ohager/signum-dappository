<script>
    import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar'
    import Logo from './Logo.svelte'

</script>

<TopAppBar variant="fixed" dense color='primary'>
    <Row>
        <Section>
            <Logo height="42px" />
            <div class="title-text">
                <Title>The Burst dAppository</Title>
            </div>
        </Section>
    </Row>
</TopAppBar>

<style>

    :global(.mdc-top-app-bar){
        box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
    }

    @media (max-width: 480px) {
        .title-text {
            display: none;
        }
    }

</style>
