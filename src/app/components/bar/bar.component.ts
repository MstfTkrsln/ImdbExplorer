import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Utils } from '../shared/utils';
import { DataService } from 'src/app/services/data.service';
import { EnumTranslatorService } from 'src/app/services/enum-translater-service';
import { KeyValuePair } from 'src/app/models/key-value-pair';
import { SortType } from 'src/app/models/enums';
import { Query } from 'src/app/models/query/query';
import { LayoutState } from 'src/app/models/layout-state';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {
  @ViewChild('navbar') navbar: ElementRef;

  currentQuery: Query;
  totalCount: string;

  isMobileScreen: boolean;
  sortTypes: KeyValuePair[];

  layoutState: LayoutState;

  constructor(private layoutService:LayoutService,private dataService: DataService, private enumService: EnumTranslatorService) {
    this.dataService.CurrentResult.subscribe(result => { this.totalCount = result ? result.TotalCount.formatWithDot() : null; });
    this.dataService.CurrentQuery.subscribe(query => { this.currentQuery = query.deepCopy(); this.totalCount = null; });

    this.enumService.onReady.subscribe(() => {
      this.sortTypes = this.enumService.getEnumValues(SortType);
    }, err => console.log(err));

    this.layoutState = this.layoutService.state;
  }

  ngOnInit() {
    this.isMobileScreen = Utils.isMobileScreen();
    window.addEventListener('scroll', this.onScrollChanged.bind(this));
  }

  changedSortType(e) {
    if (e.event) { // fire only user changed the selection
      this.currentQuery.Page = 1;
      this.dataService.changeQuery(this.currentQuery);
    }
  }

  onScrollChanged() {
    if (Utils.isFixedMode())
      this.navbar.nativeElement.classList.add('fixed-header');
    else
      this.navbar.nativeElement.classList.remove('fixed-header');
  }
}
