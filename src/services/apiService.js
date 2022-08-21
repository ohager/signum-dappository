import { httpClientProvider } from '../utils/httpClientProvider'
import { v4 as uuid } from 'uuid'
import { HttpError } from '@signumjs/http'

function mangle(filename) {
    return filename.replace(/^.*\.(.+)$/i, `${uuid()}.$1`)
}

class ApiService {
    async uploadSingleFile({ fileObj, keyValues, mangleFilename, onProgressFn }) {
        try {
            const formData = new FormData()
            const filename = mangleFilename ? mangle(fileObj.name) : fileObj.name
            formData.append('file', fileObj, filename)
            Object.keys(keyValues).forEach(k => {
                formData.append(k, keyValues[k])
            })
            let http = httpClientProvider.get()
            const { response } = await http.post('upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: onProgressFn,
            })
            return response.result.urls[2]
        } catch (e) {
            let message = e.message
            if (e instanceof HttpError) {
                message =
                    e.data && e.data.result && e.data.result.payload
                        ? e.data.result.payload.message
                        : e.message
            }
            console.error('error', e)
            throw new Error(message)
        }
    }
}

export const apiService = new ApiService()
