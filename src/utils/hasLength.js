export const hasLength = (str, minLength, maxLength) => {
    const trimmed = str && str.trim()
    return minLength <= trimmed.length && trimmed.length <= maxLength
}
