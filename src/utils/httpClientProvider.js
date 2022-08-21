import { voidFn } from './voidFn'
import { isClientSide } from './isClientSide'
import { HttpClientFactory } from '@signumjs/http'

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
    get: () =>
        isClientSide() ? HttpClientFactory.createHttpClient(`${getBaseUrl()}/api`) : voidHttpClient,
}
