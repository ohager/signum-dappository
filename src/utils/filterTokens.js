import { calculateRankingPoints } from './calculateRankingPoints'

const hasText = (text, term) => text.toLowerCase().indexOf(term.toLowerCase()) !== -1

const filterByText = text => ({ at, name, desc, tags }) =>
    at === text || hasText(name, text) || hasText(desc, text) || tags.includes(text)

const sorter = options => (a, b) => {
    let delta = 0

    if (options.orderAlphabetically) {
        delta = a.name.localeCompare(b.name)
    }

    if (options.orderByScore) {
        const rankA = calculateRankingPoints(a)
        const rankB = calculateRankingPoints(b)
        delta = delta || (rankB - rankA)
    }

    if (options.newestFirst) {
        delta = delta || (b.creationBlock - a.creationBlock)
    }

    return delta
}

export const filterTokens = (unfilteredTokens, { text, options }) => {
    let filtered = unfilteredTokens.filter(filterByText(text))

    filtered.sort(sorter(options))

    return filtered
}
