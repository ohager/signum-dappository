import { ApplicationToken } from './repositories/models/applicationToken'
import { ledgerService } from './ledgerService'

export class TokenStateMonitor {
    constructor({ tokenId, intervalSecs, abortAfterSecs }) {
        this._tokenId = tokenId
        this._intervalSecs = intervalSecs
        this._abortAfterSecs = abortAfterSecs
        this._handle = undefined
    }

    _debug(msg) {
        console.debug(`[${this._tokenId}] - ${msg}`)
    }

    start({ predicateFn, callback, startTime }) {
        this._debug('Monitoring...')
        this._handle = setTimeout(async () => {
            try {
                const contract = await ledgerService.client.contract.getContract(this._tokenId)
                const tokenData = ApplicationToken.mapFromContract(contract)
                if (predicateFn(tokenData)) {
                    this._debug('Monitor predicate fulfilled')
                    return callback(tokenData, true)
                }
                const shouldRestart = (Date.now() - startTime) / 1000 < this._abortAfterSecs
                if (shouldRestart) {
                    this.start({ predicateFn, callback, startTime })
                } else {
                    this._debug('Monitor timed out')
                    callback(tokenData, false)
                }
            } catch (e) {
                this._debug(`Monitor failed: ${e}`)
            }
        }, this._intervalSecs * 1000)
    }

    abort() {
        clearTimeout(this._handle)
    }
}
