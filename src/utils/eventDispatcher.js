export const eventDispatcher = (eventTarget) => (type, payload) => {
    eventTarget.dispatchEvent(new CustomEvent(type, { detail: payload }))
}
