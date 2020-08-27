import { cubicInOut } from 'svelte/easing'

export function rotate(node, { duration = 1000, degrees  }) {
    return {
        duration,
        css: t => {
            const eased = cubicInOut(t);
            return `
                transform: rotate(${eased * degrees}deg);
                opacity: ${eased}
            `
        }
    };
}
