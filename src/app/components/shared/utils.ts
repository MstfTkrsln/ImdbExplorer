export class Utils {
    public static isDesktopScreen(): boolean {
        var screenWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        if (screenWidth >= 1170)
            return true;
        else
            return false;
    }
}