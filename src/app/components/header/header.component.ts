import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
import { Utils } from '../shared/utils';
import { DataService } from 'src/app/services/data.service';
import { NavigationMenu } from 'src/app/models/navigation-menu';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    isMobileScreen: boolean;
    menus: any[];
    mobileMenus: any[]

    constructor(private navigationService: NavigationService, private dataService: DataService) {
        this.isMobileScreen = Utils.isMobileScreen();
        this.menus = this.navigationService.getDesktopNavigations();
        this.mobileMenus = this.navigationService.getMobileNavigations();
    }

    ngOnInit() {
    }

    navigationSelected(e) {
        let navigation: NavigationMenu = e.itemData
        if (navigation.Query)
            this.dataService.changeQuery(navigation.Query);
    }

}
