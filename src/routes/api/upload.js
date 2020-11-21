import multer from 'multer'
import path from 'path'
import Boom from '@hapi/boom'
import { pinFile } from './__helpers__/pinFile'
import { serializeResponse } from './__helpers__/serializeResponse'

const AcceptedFormats = ['.png', '.jpg', '.webp', '.svg']

const IpfsGateways = {
    pinata: 'https://gateway.pinata.cloud/ipfs',
    ipfs: 'https://ipfs.io/ipfs',
    cloudflare: 'https://cloudflare-ipfs.com/ipfs',
}

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        files: 1,
        fileSize: 256 * 1024,
        parts: 2,
    },
    fileFilter: (req, file, cb) => {
        console.log('filefilter', file)
        const { ext } = path.parse(file.originalname)
        const accepted = AcceptedFormats.includes(ext.toLowerCase())
        if (!accepted) {
            cb(Boom.unsupportedMediaType(`Format not supported: ${ext}`))
        } else {
            cb(null, accepted)
        }
    },
})

export const post = async (req, res) => {
    const uploadCb = upload.single('file')
    uploadCb(req, res, async err => {
        res.setHeader('Content-Type', 'application/json')
        if (err) {
            if(!Boom.isBoom(err)){
                err = Boom.notAcceptable(err.message)
            }
            const { output } = err
            res.statusCode = output.statusCode
            res.end(serializeResponse(output))
            return
        }
        try {
            const { buffer, originalname } = req.file
            const { data } = await pinFile({
                fileBuffer: buffer,
                name: originalname,
                meta: {
                    origin: req.headers.host,
                    account: req.body.account,
                },
            })

            const response = {
                cid: data.IpfsHash,
                urls: Object.keys(IpfsGateways).map(k => `${IpfsGateways[k]}/${data.IpfsHash}`),
            }

            res.end(serializeResponse(response))
        } catch (e) {
            const boom = Boom.boomify(e, { statusCode: 500 })
            res.statusCode = 500
            res.end(boom)
        }
    })
}
