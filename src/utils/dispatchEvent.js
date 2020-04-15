export const dispatchEvent = (type, payload) => {
    window.dispatchEvent(new CustomEvent(type, { detail: payload }))
}
