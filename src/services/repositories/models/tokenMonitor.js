/**
 * data struct
 *
 * at: string
 * [fieldName]:expectedValue
 * startTime: number
 */
export class TokenMonitor {
    constructor(data) {
        Object.keys(data).forEach(k => this[k] = data[k])
    }

    static schema() {
        return 'at'
    }
}
