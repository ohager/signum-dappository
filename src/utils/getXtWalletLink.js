import { isClientSide } from './isClientSide'

export function getXtWalletLink() {
    let link = ''
    if (isClientSide()) {
        link = navigator.userAgent.match(/firefox|fxios/i)
            ? 'https://addons.mozilla.org/en-US/firefox/addon/signum-xt-wallet'
            : 'https://chrome.google.com/webstore/detail/signum-xt-wallet/kdgponmicjmjiejhifbjgembdcaclcib'
    }
    return link
}
