import focus from '@alpinejs/focus'
import collapse from '@alpinejs/collapse'
import anchor from './core/_anchor'
import carousel from './core/_embla'

/**
 *  Intended to be used as an Alpine.js plugin.
 */
export default function (Alpine) {
    Alpine.plugin(focus)
    Alpine.plugin(anchor)
    Alpine.plugin(collapse)
    Alpine.plugin(carousel)
}
