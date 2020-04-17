import { HttpImpl } from '@burstjs/http'

class _ProxyApi {

    constructor() {
        this._http = new HttpImpl('/')
    }

    async createContract(args) {
        const { response: unsignedHexMessage } = await this._http.post('/api/contract', args)
        return unsignedHexMessage
    }

    async broadcastTransaction(signedTransaction) {
        const { response: transactionId } = await this._http.post('/api/broadcast', {signedTransaction})
        return transactionId
    }
}

export const ProxyApi = new _ProxyApi()
