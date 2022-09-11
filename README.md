[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=ohager_burst-dappository&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=ohager_burst-dappository)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=ohager_burst-dappository&metric=bugs)](https://sonarcloud.io/dashboard?id=ohager_burst-dappository)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=ohager_burst-dappository&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=ohager_burst-dappository)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ohager_burst-dappository&metric=alert_status)](https://sonarcloud.io/dashboard?id=ohager_burst-dappository)

# Signum DAppository

<p align="center">
    <img src="./static/android-chrome-192x192.png" alt="Signum DAppository Logo">
</p>

The __Signum DAppository__ is a platform to register tools and applications for the [Signum](https://signum.network/) eco-system. 
On one hand, this platform serves as a kind of application store, but also as an exhibition center for developers. 

## Digital Asset using Signum Smart Contracts

Each registered entry is represented through a digital (cryptographic) asset/token using [Signum Smart Contracts](./assets/SmartContract.java) and is stored in the 
Signum blockchain. The registrar is the initial owner of that token. Therefore, the token is a so called [Non-Fungible Token](https://en.wikipedia.org/wiki/Non-fungible_token) (NFT):
the token can only be owned by one person at a time, but it's possible to transfer it to another person, e.g. by selling it.

Furthermore, the token can receive amounts from other Signum Accounts. The received amount will be redirected 
(subtracting an inherent contract execution fee) to the owner. The number of transactions (considered as donations) 
is counted, and the received amounts are summed up, and kept in the Smart Contract. This can be used as a success indicator. 

