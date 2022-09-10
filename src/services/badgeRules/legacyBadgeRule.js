import { AbstractBadgeRule } from './abstractBadgeRule'

export class LegacyBadgeRule extends AbstractBadgeRule {
    constructor(maxLegacyBlockHeight) {
        super({
            name: 'Legacy',
            description: 'Created before Signum Rebranding',
            icon: 'legacy.png',
        })

        this._maxLegacyBlock = maxLegacyBlockHeight
    }

    test({ token }) {
        return token.creationBlock < this._maxLegacyBlock
    }
}
