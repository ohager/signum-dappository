import { AbstractBadgeRule } from './abstractBadgeRule'
import { calculateRankingPoints } from '../../utils/calculateRankingPoints'

export class LowScoreBadgeRule extends AbstractBadgeRule {
    constructor() {
        super({
            name: '',
            description: '',
            icon: 'loscore.svg',
            textStyle: 'top: 12px;',
        })
    }

    test({ token, allTokens, block }) {
        const score = calculateRankingPoints(token)
        let targetScore = 0
        for (let i = 0; i < 1000; i += 250) {
            if (score >= i) {
                targetScore = i
            }
        }
        this._adjustData(targetScore)
        return targetScore > 0
    }

    _adjustData(targetScore) {
        this._name = `Score ${targetScore} Token`
        this._description = `You got a score greater than ${targetScore}`
        this._text = (targetScore / 100).toFixed(0)
    }
}
