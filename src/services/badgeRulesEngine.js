import { EarlyAccessBadgeRule } from './badgeRules/earlyAccessBadgeRule'
import { Vars } from '../context'
import { FirstDonationBadgeRule } from './badgeRules/firstDonationBadgeRule'
import { LowScoreBadgeRule } from './badgeRules/lowScoreBadgeRule'
import { HiScoreBadgeRule } from './badgeRules/hiScoreBadgeRule'

class BadgeRulesEngine {
    constructor(rules) {
        this._rules = rules
    }

    run({ token, allTokens, block }) {
        let badges = []
        for(const rule of this._rules){
            if(rule.test({ token, allTokens, block })){
                badges.push(rule.badgeData)
            }
        }
        return badges
    }
}

const ruleSet = [
    new FirstDonationBadgeRule(),
    new LowScoreBadgeRule(),
    new EarlyAccessBadgeRule(Vars.MaxEarlyAccessBlockHeight),
    new HiScoreBadgeRule(),
]

export const badgeRulesEngine = new BadgeRulesEngine(ruleSet)
