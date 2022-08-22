<script>
    import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar'
    import Logo from './Logo.svelte'

</script>

<TopAppBar variant="fixed" dense color='primary'>
    <Row>
        <Section>
            <Logo height="42px" />
            <div class="title-text">
                <Title>The Signum dAppository</Title>
            </div>
        </Section>
    </Row>
</TopAppBar>

<style>

    :global(.mdc-top-app-bar){
        box-shadow: var(--box-shadow)
    }

    @media (max-width: 480px) {
        .title-text {
            display: none;
        }
    }

</style>
