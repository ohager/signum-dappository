export class AbstractBadgeRule {
    constructor({name, description, icon, text, textStyle}) {
        this._name = name || ''
        this._text = text || ''
        this._description = description || ''
        this._icon = icon || ''
        this._textStyle = textStyle || ''
    }

    test({token, allTokens, blockHeight}) {
        throw Error('This is an abstract class - please inherit')
    }

    get badgeData() {
        return {
            name: this._name,
            text: this._text,
            description: this._description,
            icon: this._icon,
            textStyle: this._textStyle,
        }
    }
}
