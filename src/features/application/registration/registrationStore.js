import { get, writable } from 'svelte/store'
import MagicMapper from 'magic-mapper'

const InitialRegistrationState = {
    account: '',
    name: '',
    desc: '',
    repo: '',
    img: '',
    lic: 'MIT',
    tags: [],
    isPassphraseValid: false,
    isValid: false,
}

export const registration$ = writable(InitialRegistrationState)

export const tokenData = () => new MagicMapper({ exlusive: true })
    .map(get(registration$), {
        name: MagicMapper.Direct,
        desc: MagicMapper.Direct,
        repo: MagicMapper.Direct,
        img: MagicMapper.Direct,
        lic: MagicMapper.Direct,
        tags: MagicMapper.Direct,
    })

export const calculateDataLength = () => {
    return JSON.stringify(tokenData()).length
}
