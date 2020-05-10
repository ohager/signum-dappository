export class Settings {
    constructor(data) {
        this.key = data.key
        this.value = data.value
    }

    static schema() {
        return 'key'
    }
}
