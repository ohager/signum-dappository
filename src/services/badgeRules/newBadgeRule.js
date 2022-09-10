import { AbstractBadgeRule } from './abstractBadgeRule'

const BlocksPerDay = 360

export class NewBadgeRule extends AbstractBadgeRule {
    constructor() {
        super({
            name: 'New Token',
            description: 'This is a new token',
            icon: 'new.svg',
        })
    }

    test({ token, block }) {
        const { height } = block
        return height - token.creationBlock < BlocksPerDay * 30
    }
}
