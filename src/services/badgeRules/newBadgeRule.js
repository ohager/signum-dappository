import { AbstractBadgeRule } from './abstractBadgeRule'

const BlocksPerDay = 360

export class NewBadgeRule extends AbstractBadgeRule {
    constructor() {
        super({
            name: 'New Token',
            description: 'This is a new token',
            icon: 'new',
        })
    }

    test({ token, allTokens, block }) {
        const { height } = block
        return height - token.creationBlock < BlocksPerDay * 30
    }
}
