export const Config = {
    PeerUrl: process.env.SAPPER_APP_BURST_PEER_URL,
    FirstApplicationContractId: process.env.SAPPER_APP_FIRST_CONTRACT_ID,
    ContractPollingIntervalSecs: process.env.SAPPER_APP_CONTRACT_POLLING_INTERVAL_SECS * 1000,
}
