import { EarlyAccessBadgeRule } from './badgeRules/earlyAccessBadgeRule'
import { Vars } from '../context'
import { FirstDonationBadgeRule } from './badgeRules/firstDonationBadgeRule'
import { LowScoreBadgeRule } from './badgeRules/lowScoreBadgeRule'
import { HiScoreBadgeRule } from './badgeRules/hiScoreBadgeRule'
import { NewBadgeRule } from './badgeRules/newBadgeRule'
import { ChampionBadgeRule } from './badgeRules/championBadgeRule'
import { ContributorBadgeRule } from './badgeRules/contributorBadgeRule'
import {LegacyBadgeRule} from "./badgeRules/legacyBadgeRule";

class BadgeRulesEngine {
    constructor(rules) {
        this._rules = rules
    }

    run({ token, allTokens, block }) {
        let badges = []
        for (const rule of this._rules) {
            if (rule.test({ token, allTokens, block })) {
                badges.push(rule.badgeData)
            }
        }
        return badges
    }
}

const ruleSet = [
    new LegacyBadgeRule(Vars.MaxLegacyBlockHeight),
    new FirstDonationBadgeRule(),
    new EarlyAccessBadgeRule(Vars.MaxEarlyAccessBlockHeight),
    new LowScoreBadgeRule(),
    new HiScoreBadgeRule(),
    new ContributorBadgeRule(),
    new ChampionBadgeRule(),
    new NewBadgeRule(),
]

export const badgeRulesEngine = new BadgeRulesEngine(ruleSet)
