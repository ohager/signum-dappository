import { ApplicationToken } from '../repositories/models/applicationToken'
import { BurstApi } from './burstApi'

export class TokenStateMonitor {
    _tokenId
    _intervalSecs
    _abortAfterSecs
    _handle

    constructor({ tokenId, intervalSecs, abortAfterSecs }) {
        this._tokenId = tokenId
        this._intervalSecs = intervalSecs
        this._abortAfterSecs = abortAfterSecs
    }

    _debug(msg) {
        console.debug(`[${this._tokenId}] - ${msg}`)
    }

    watch({ predicateFn, callback, startTime = Date.now() }) {
        this._debug('Monitor (re)started')
        this._handle = setTimeout(async () => {
            try {
                const contract = await BurstApi.contract.getContract(this._tokenId)
                const tokenData = ApplicationToken.mapFromContract(contract)
                if (predicateFn(tokenData)) {
                    this._debug('Monitor predicate fulfilled')
                    return callback(tokenData)
                }
                const shouldRestart = (Date.now() - startTime) / 1000 < this._abortAfterSecs
                if (shouldRestart) {
                    this.watch({ predicateFn, callback, startTime })
                }
                else{
                    this._debug('Monitor timed out')
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
