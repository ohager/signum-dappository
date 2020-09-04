[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=ohager_burst-dappository&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=ohager_burst-dappository)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=ohager_burst-dappository&metric=bugs)](https://sonarcloud.io/dashboard?id=ohager_burst-dappository)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=ohager_burst-dappository&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=ohager_burst-dappository)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ohager_burst-dappository&metric=alert_status)](https://sonarcloud.io/dashboard?id=ohager_burst-dappository)

# burst-dappository

__Burst Dappository__ is a platform to register tools and applications for the [Burst](https://www.burst-coin.org/) eco-system. 
On one hand, this platform serves as a kind of application store, but also as an exhibition center for developers. 

## Digital Asset using Burstcoin Smart Contracts

Each registered entry is represented through a digital (cryptographic) asset using Burst Smart Contracts and is stored in the 
Burst blockchain. The registree is the initial owner of that asset. Therefore, the asset is a so called [Non-Fungible Token](https://en.wikipedia.org/wiki/Non-fungible_token) (NFT):
the asset can only be owned by one person at a time, but it's possible to transfer it to another person, e.g. by selling it.

Furthermore, the asset aka token can receive amounts from other Burst Accounts. The received amount will be redirected 
(subtracting an inherent contract execution fee) to the owner. The number of transactions (considered as donations) 
is counted, and the received amounts are summed up, and kept in the Smart Contract. This can be used as a success indicator. 
