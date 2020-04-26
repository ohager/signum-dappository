<script>
    import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar'
    import IconButton from '@smui/icon-button'
    import { inactiveTokens$ } from '../stores/inactiveTokensStore'

    $: hasInactiveTokens = $inactiveTokens$.tokens.length > 0

</script>

<style>
    .burst-logo {
        height: 48px
    }
</style>

<TopAppBar variant="static" dense color='primary'>
    <Row>
        <Section>
            <IconButton class="material-icons">menu</IconButton>
            <img class="burst-logo" src="img/burst-white.svg" alt="Burst"/>
            <Title>Applications</Title>
        </Section>
        <Section align="end" toolbar>
            {#if hasInactiveTokens}
                <IconButton ripple={false} class="material-icons animation-pulse" aria-label="New Tokens Available">new_releases</IconButton>
            {/if}
        </Section>
    </Row>
</TopAppBar>
