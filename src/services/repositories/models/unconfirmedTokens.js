export class UnconfirmedTokens {
    constructor(data) {
        Object.keys(data).forEach(k => this[k] = data[k])
    }

    static schema() {
        return 'at'
    }
}
