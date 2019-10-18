import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
import { Utils } from '../shared/utils';
import { NavigationMenu } from 'src/app/models/navigation-menu';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    hasEnoughWidthForTopMenu: boolean;
    menus: any[];
    mobileMenus: any[]

    constructor(private navigationService: NavigationService, private layoutservice: LayoutService, private router: Router) {
        this.hasEnoughWidthForTopMenu = Utils.hasEnoughWidthForTopMenu();
        this.menus = this.navigationService.getDesktopNavigations();
        this.mobileMenus = this.navigationService.getMobileNavigations();
    }

    ngOnInit() {
    }

    navigationSelected(e) {
        let navigation: NavigationMenu = e.itemData

        //hide menu when clicked the menu button again on mobile
        if (navigation.Icon && e.component._visibleSubmenu)
            setTimeout(() => {
                e.component._visibleSubmenu.hide();
            });

        if (!Utils.isDesktopScreen())
            this.layoutservice.onFilterPanelToggle(false);

        if (navigation.Link)
            this.router.navigate([navigation.Link]);
    }

    routeToHome() {
        if (!Utils.isDesktopScreen())
            this.layoutservice.onFilterPanelToggle(false);

        this.router.navigate(['/']);
    }

}
