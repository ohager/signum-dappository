export class Favorite {
    constructor(data) {
        this.isFavorite = data.isFavorite
    }

    static schema() {
        return 'at'
    }
}
