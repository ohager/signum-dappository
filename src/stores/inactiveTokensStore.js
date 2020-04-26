import { writable } from 'svelte/store'
import { isClientSide } from '../utils/isClientSide'
import { inactiveTokenService } from '../services/inactiveTokenService'

const InitialState = {
    tokens: [],
}

const inactiveTokens$ = writable(InitialState, (set) => {
    if (isClientSide()) {
        inactiveTokenService.getTokens()
            .then(tokens => {
                console.log('tokens', tokens)
                inactiveTokens$.update(state => ({
                    ...state,
                    tokens,
                }))
            })
    }
    return () => {
        set(InitialState)
    }
})


export {
    inactiveTokens$,
}
