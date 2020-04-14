export const eventDispatcher = (eventTarget = window) => (type, payload) => {
    eventTarget.dispatchEvent(new CustomEvent(type, { detail: payload }))
}
