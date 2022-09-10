import { AbstractBadgeRule } from './abstractBadgeRule'
import { calculateRankingPoints } from '../../utils/calculateRankingPoints'

export class ChampionBadgeRule extends AbstractBadgeRule {
    constructor() {
        super({
            name: 'Champion',
            description: 'Highest score of all',
            icon: 'champion.svg',
        })
    }

    test({ token, allTokens, block }) {
        const thizScore = calculateRankingPoints(token)
        const maxScore = allTokens
            .filter(t => t.at !== token.at)
            .reduce((maxScore, t) => Math.max(maxScore, calculateRankingPoints(t)), 0)
        return thizScore >= maxScore
    }
}
