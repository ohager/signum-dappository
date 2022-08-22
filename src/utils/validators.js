import { isEmptyString } from './isEmptyString'
import {
    MaxDescriptionLength,
    MaxNameLength,
    MaxUrlLength,
} from '../features/registration/constants'
import { hasLength } from './hasLength'
import { generateMasterKeys, getAccountIdFromPublicKey } from '@signumjs/crypto'
import { assureAccountId } from './assureAccountId'

const testUrl = url => /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/]+$/i.test(url)

const isRequiredAndHasCorrectLength = (str, maxLength) =>
    !isEmptyString(str) || hasLength(str, 1, maxLength)

export const isValidAccount = account => {
    return !isEmptyString(account)
}

export const isValidName = name => {
    return isRequiredAndHasCorrectLength(name, MaxNameLength)
}

export const isValidDescription = desc => {
    return isRequiredAndHasCorrectLength(desc, MaxDescriptionLength)
}

export const isValidPassphrase = (phrase, account) => {
    const { publicKey } = generateMasterKeys(phrase)
    const accountId = getAccountIdFromPublicKey(publicKey)
    return accountId === assureAccountId(account)
}

export const isValidUrl = url => {
    return hasLength(url, 1, MaxUrlLength) && testUrl(url)
}
