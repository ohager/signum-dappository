import { AbstractBadgeRule } from './abstractBadgeRule'
import { calculateRankingPoints } from '../../utils/calculateRankingPoints'

export class ContributorBadgeRule extends AbstractBadgeRule {
    constructor() {
        super({
            name: 'Contributor',
            description: 'Token from most frequent contributor',
            icon: 'contributor.svg',
        })
    }

    _countContributions({ owner, allTokens }) {
        return allTokens.reduce((count, t) => count + (t.owner === owner ? 1 : 0), 0)
    }

    test({ token, allTokens, block }) {
        const thizOwner = token.owner
        let maxOwnerCount = { owner: '', count: 0 }
        allTokens.forEach(({ owner }) => {
            const count = this._countContributions({ owner, allTokens })
            if (count > maxOwnerCount.count) {
                maxOwnerCount = { count, owner }
            }
        })
        return thizOwner === maxOwnerCount.owner
    }
}
