declare const $: any;

export class Utils {
    public static isDesktopScreen(): boolean {
        var screenWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        if (screenWidth >= 1170)
            return true;
        else
            return false;
    }

    public static isMobileScreen(): boolean {
        var screenWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        if (screenWidth <= 768)
            return true;
        else
            return false;
    }

    public static hasEnoughWidthForTopMenu(): boolean {
        var screenWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        if (screenWidth >= 900)
            return true;
        else
            return false;
    }

    public static backToTop() {
        $('html, body').animate({ scrollTop: 0 }, '300');
    }

    public static isFixedMode() {
        return window.pageYOffset > 80; //80=header+bar
    }
}