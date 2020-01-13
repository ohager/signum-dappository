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
    isValid: false,
}

export const registration$ = writable(InitialRegistrationState)

export const calculateDataLength = () => {
    const mapper = new MagicMapper({ exclusive: true })
    const mapped = mapper.map(get(registration$), {
        name: MagicMapper.Direct,
        desc: MagicMapper.Direct,
        repo: MagicMapper.Direct,
        img: MagicMapper.Direct,
        lic: MagicMapper.Direct,
        tags: MagicMapper.Direct,
    })
    return JSON.stringify(mapped).length
}
