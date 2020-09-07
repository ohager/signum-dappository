import { isClientSide } from './isClientSide'

export const isMobile = () => isClientSide() && window.matchMedia('(max-width: 480px)').matches
