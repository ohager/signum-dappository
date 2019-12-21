<script>
    import TopAppBar, {Row, Section, Title} from '@smui/top-app-bar';
    import IconButton from '@smui/icon-button';
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
<!--        <Section align="end" toolbar>-->
<!--            <IconButton class="material-icons" aria-label="Download">file_download</IconButton>-->
<!--            <IconButton class="material-icons" aria-label="Print this page">print</IconButton>-->
<!--            <IconButton class="material-icons" aria-label="Bookmark this page">bookmark</IconButton>-->
<!--        </Section>-->
    </Row>
</TopAppBar>
