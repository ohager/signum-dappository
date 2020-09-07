import { isClientSide } from './isClientSide'
import QueryString from 'query-string'

export const getUrlQuery = () => (isClientSide() ? QueryString.parse(location.search) : {})
