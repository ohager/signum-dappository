import { Web3Storage, File } from 'web3.storage'

const Web3StorageToken = process.env.SAPPER_APP_WEB3STORAGE_TOKEN

export const pinFileWithWeb3Storage = async ({ fileBuffer, name }) => {
    const web3StorageClient = new Web3Storage({ token: Web3StorageToken })
    const cid = await web3StorageClient.put([new File([fileBuffer], name)], {
        name: `signum-dappository-${name}`,
        wrapWithDirectory: false,
    })
    return { data: { IpfsHash: cid } }
}
