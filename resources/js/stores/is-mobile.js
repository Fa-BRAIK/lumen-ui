export const RegisterIsMobileStore = ({
    storeName = 'lumenMobileChecker',
    mobileBreakdown = 768,
} = {}) => {
    const mql = window.matchMedia(`(max-width: ${mobileBreakdown - 1}px)`);

    const onChange = () => {
        console.log(`Media query changed: ${mql.matches ? 'Mobile' : 'Desktop'}`);
        Alpine.store(storeName).isMobile = window.innerWidth < mobileBreakdown
    };

    Alpine.store(storeName, {
        isMobile: undefined,
        mql,

        init() {
            mql.addEventListener("change", onChange);
            this.isMobile = window.innerWidth < mobileBreakdown;
        },

        destroy() {
            mql.removeEventListener("change", onChange);
        },
    });
};
