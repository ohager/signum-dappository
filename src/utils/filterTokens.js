import { calculateRankingPoints } from './calculateRankingPoints'

const hasText = (text, term) => text.indexOf(term) !== -1

const filterByText =
    text =>
    ({ at, name, desc, tags }) => {
        const loText = text.toLowerCase()
        const loName = name.toLowerCase()
        const loDesc = desc.toLowerCase()
        return (
            at === loText ||
            hasText(loName, loText) ||
            hasText(loDesc, loText) ||
            tags.some(tag => hasText(tag.toLowerCase(), loText))
        )
    }

const sorter = options => (a, b) => {
    let delta = 0

    if (options.orderAlphabetically) {
        delta = a.name.localeCompare(b.name)
    }

    if (options.orderByScore) {
        const rankA = calculateRankingPoints(a)
        const rankB = calculateRankingPoints(b)
        delta = delta || rankB - rankA
    }

    if (options.newestFirst) {
        delta = delta || b.creationBlock - a.creationBlock
    }

    return delta
}

export const filterTokens = (unfilteredTokens, { text, options }) => {
    let filtered = unfilteredTokens.filter(filterByText(text))

    filtered.sort(sorter(options))

    return filtered
}
