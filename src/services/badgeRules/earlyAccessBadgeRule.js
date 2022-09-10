import { AbstractBadgeRule } from './abstractBadgeRule'

export class EarlyAccessBadgeRule extends AbstractBadgeRule {
    constructor(maxEarlyAccessBlock) {
        super({
            name: 'Early Access',
            description: 'You are an early adopter',
            icon: 'early-adopt.svg',
        })

        this._maxEarlyAccessBlock = maxEarlyAccessBlock
    }

    test({ token, allTokens, block }) {
        return token.creationBlock < this._maxEarlyAccessBlock
    }
}
