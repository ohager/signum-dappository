// ATTENTION: THESE ARE CLIENT SIDE VARS - DO NOT PUT SECRET HERE IN
export const Vars = {
    IsTestnet: process.env.SAPPER_APP_IS_TESTNET === 'true',
    IsMaintenance: process.env.SAPPER_APP_IS_MAINTENANCE === 'true',
    HostUrl: process.env.SAPPER_APP_HOST_URL,
    ContractReference: process.env.SAPPER_APP_CONTRACT_REFERENCE,
    ContractMachineCodeHashes: process.env.SAPPER_APP_MACHINE_CODE_HASH_IDS.split(','),
    ContractPollingIntervalSecs: process.env.SAPPER_APP_CONTRACT_POLLING_INTERVAL_SECS * 1000,
    UnconfirmedTxPollingIntervalSecs:
        process.env.SAPPER_APP_UNCONFIRMED_TX_POLLING_INTERVAL_SECS * 1000,
    DeeplinkRedirectServiceUrl: process.env.SAPPER_APP_DEEPLINK_REDIRECT_SERVICE_URL,
    TokenWatcherIntervalSecs: process.env.SAPPER_APP_TOKEN_WATCHER_INTERVAL_SECS,
    TokenWatcherTimeoutSecs: process.env.SAPPER_APP_TOKEN_WATCHER_TIMEOUT_SECS,
    ExplorerUrl: process.env.SAPPER_APP_EXPLORER_URL,
    MaxEarlyAccessBlockHeight: process.env.SAPPER_APP_MAX_EARLY_ACCESS_BLOCK_HEIGHT,
    MaxLegacyBlockHeight: process.env.SAPPER_APP_MAX_LEGACY_BLOCK_HEIGHT,
}
