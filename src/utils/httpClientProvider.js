import { voidFn } from './voidFn'
import { isClientSide } from './isClientSide'
import { HttpImpl as HttpClient } from '@burstjs/http'

const voidPromise = () => new Promise(voidFn)
const getBaseUrl = () => (isClientSide() ? window.location.origin : 'dummyOrigin')
const voidHttpClient = {
    get: voidPromise,
    post: voidPromise,
    put: voidPromise,
    delete: voidPromise,
    baseUrl: getBaseUrl(),
}

export const httpClientProvider = {
    get: () => (isClientSide() ? new HttpClient(`${getBaseUrl()}/api`) : voidHttpClient),
}
