export class UnconfirmedTransactions {
    constructor(data) {
        Object.keys(data).forEach(k => this[k] = data[k])
    }

    static schema() {
        return 'id, recipient'
    }
}
