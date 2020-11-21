import axios from 'axios'
import { Readable } from 'stream'
import FormData from 'form-data'

const PinataKeys = {
    ApiKey: process.env.SAPPER_APP_PINATA_API_KEY,
    SecretKey: process.env.SAPPER_APP_PINATA_SECRET_API_KEY
}

export const pinFile = async ({ fileBuffer, name, meta }) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`
    let data = new FormData()
    data.append('file', Readable.from(fileBuffer), name)

    const metadata = JSON.stringify({
        keyvalues: meta,
    })
    const options = JSON.stringify({
        cidVersion: '1',
    })
    data.append('pinataMetadata', metadata)
    data.append('pinataOptions', options)

    return await axios.post(url, data, {
        maxContentLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
        headers: {
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            pinata_api_key: PinataKeys.ApiKey,
            pinata_secret_api_key: PinataKeys.SecretKey,
        },
    })
}
