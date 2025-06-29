import EmblaCarousel from 'embla-carousel'

export default function (Alpine) {
    Alpine.magic('emblaApi', () => (el, options) => new EmblaCarousel(el, options));
}
