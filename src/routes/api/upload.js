import multer from 'multer'
import path from 'path'
import Boom from '@hapi/boom'
import { serializeResponse } from './__helpers__/serializeResponse'
import { pinFileWithWeb3Storage } from './__helpers__/pinFileWithWeb3Storage'
const AcceptedFormats = ['.png', '.jpg', '.jpeg', '.webp', '.svg']

let IpfsGateway = process.env.SAPPER_APP_IPFS_URL
if (!IpfsGateway.endsWith('/')) {
    IpfsGateway += '/'
}

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        files: 1,
        fileSize: 256 * 1024,
        // parts: 2,
    },
    fileFilter: (req, file, cb) => {
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
            if (!Boom.isBoom(err)) {
                err = Boom.notAcceptable(err.message)
            }
            const { output } = err
            res.statusCode = output.statusCode
            res.end(serializeResponse(output))
            return
        }
        try {
            const { buffer, originalname } = req.file
            const { data } = await pinFileWithWeb3Storage({
                fileBuffer: buffer,
                name: originalname,
            })

            const response = {
                cid: data.IpfsHash,
                url: IpfsGateway + data.IpfsHash,
            }

            res.end(serializeResponse(response))
        } catch (e) {
            const boom = Boom.boomify(e, { statusCode: 500 })
            res.statusCode = 500
            res.end(boom)
        }
    })
}
