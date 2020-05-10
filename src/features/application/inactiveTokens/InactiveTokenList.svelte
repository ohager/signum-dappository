<script>
    import {onMount, onDestroy, beforeUpdate} from 'svelte'
    import DataTable, {Head, Body, Row, Cell} from '@smui/data-table';
    import {inactiveTokenService} from '../../../services/inactiveTokenService';
    import {BurstApi} from '../../../utils/burstApi';

    let intervalHandle = null
    let isLoading = true
    let inactiveTokens = []

    onMount(() => {
        const fetchTokens = async () => {
            inactiveTokens = await inactiveTokenService.fetchTokens()
        }
        fetchTokens()
        intervalHandle = setInterval(fetchTokens, 10 * 1000)
    })

    onDestroy(() => {
        clearInterval(intervalHandle)
    })

    beforeUpdate(() => {
        console.log(JSON.stringify(inactiveTokens))
    })

</script>

<DataTable table$aria-label="Inactive Token list">
    <Head>
        <Row>
            <Cell>Id</Cell>
            <Cell>Favorite Color</Cell>
            <Cell>Favorite Number</Cell>
        </Row>
    </Head>
    <Body>
    {#each inactiveTokens as token}
        <Row>
            <Cell>{token.at}</Cell>
            <Cell>Red</Cell>
            <Cell numeric>45</Cell>
        </Row>
    {/each}
    </Body>
</DataTable>
