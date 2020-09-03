import { AbstractBadgeRule } from './abstractBadgeRule'

export class NewBadgeRule extends AbstractBadgeRule {
    constructor() {
        super({
            name: 'New Token',
            description: 'This is a new token',
            icon: 'new'
        })
    }

    test({token, allTokens, block}) {
        const {height} = block
        return token.creationBlock < height + 38400
    }
}
