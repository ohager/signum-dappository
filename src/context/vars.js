export const Vars = {
    IsTestnet: process.env.SAPPER_APP_IS_TESTNET,
    IsMaintenance: process.env.SAPPER_APP_IS_MAINTENANCE,
    PeerUrl: process.env.SAPPER_APP_BURST_PEER_URL,
    FirstApplicationContractId: process.env.SAPPER_APP_FIRST_CONTRACT_ID,
    ContractPollingIntervalSecs: process.env.SAPPER_APP_CONTRACT_POLLING_INTERVAL_SECS * 1000,
    UnconfirmedTxPollingIntervalSecs: process.env.SAPPER_APP_UNCONFIRMED_TX_POLLING_INTERVAL_SECS * 1000,
    DeeplinkRedirectServiceUrl: process.env.SAPPER_APP_DEEPLINK_REDIRECT_SERVICE_URL,
    TokenWatcherIntervalSecs: process.env.SAPPER_APP_TOKEN_WATCHER_INTERVAL_SECS,
    TokenWatcherTimeoutSecs: process.env.SAPPER_APP_TOKEN_WATCHER_TIMEOUT_SECS,
    ExplorerUrl: process.env.SAPPER_APP_EXPLORER_URL,
    MaxEarlyAccessBlockHeight: process.env.SAPPER_APP_MAX_EARLY_ACCESS_BLOCK_HEIGHT
}
