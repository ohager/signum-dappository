import { AbstractBadgeRule } from './abstractBadgeRule'
import { calculateRankingPoints } from '../../utils/calculateRankingPoints'

export class HiScoreBadgeRule extends AbstractBadgeRule {
    constructor() {
        super({
            name: '',
            description: '',
            icon: 'hiscore.svg',
            textStyle: 'top: 16px; color: white',
        })
    }

    test({ token, allTokens, block }) {
        const score = calculateRankingPoints(token)
        let targetScore = 0
        for (let i = 1000; i < 10000; i += 500) {
            if (score >= i) {
                targetScore = i
            }
        }
        this._adjustData(targetScore)
        return targetScore > 0
    }

    _adjustData(targetScore) {
        this._name = `High Score ${targetScore} Token`
        this._description = `You got a high score greater than ${targetScore}`
        this._text = (targetScore / 1000).toFixed(0)
    }
}
