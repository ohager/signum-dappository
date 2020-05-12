export const RouteHome = () => '/'
export const RouteDonate = at => `/donate/${at}`
export const RouteActivate = at => `/activate/${at}`
export const RouteTransfer = at => `/transfer/${at}`
export const RouteRegister = () => '/register'
export const RouteAccountTokens = (accountId,wantsRegister=false) => `/account/${accountId}${wantsRegister ? '?registering=true': ''}`
