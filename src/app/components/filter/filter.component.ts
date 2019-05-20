import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { Query } from 'src/app/models/query/query';
import { EnumTranslatorService } from 'src/app/services/enum-translater-service';
import { Genre, Color, Group, SortType, TitleType, Language, Country, Compnay } from 'src/app/models/enums';
import { KeyValuePair } from 'src/app/models/key-value-pair';
import { Utils } from '../shared/utils';
import { DxRangeSelectorComponent } from 'devextreme-angular/ui/range-selector';
import { DataService } from 'src/app/services/data.service';

declare const $: any;

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @ViewChild('ratingSelector') ratingSelector: DxRangeSelectorComponent;
  @ViewChild('yearSelector') yearSelector: DxRangeSelectorComponent;

  @ViewChild('filterBar') filterBar: ElementRef;

  filterBarTopDefault: number;

  query: Query;

  genres: KeyValuePair[];
  colors: KeyValuePair[];
  groups: KeyValuePair[];
  sortTypes: KeyValuePair[];
  titleTypes: KeyValuePair[];
  languages: KeyValuePair[];
  countries: KeyValuePair[];

  onNetflix: boolean = false;
  onAmazon: boolean = false;

  isFilterSearchable: boolean = true;

  currentYear: number = new Date().getFullYear();

  ratingRange: any[2] = [null, null];
  yearRange: any[2] = [null, null];

  constructor(private enumService: EnumTranslatorService, private dataService: DataService) {
    this.query = new Query();

    this.enumService.onReady.subscribe(() => {
      this.genres = this.enumService.getEnumValues(Genre);
      this.colors = this.enumService.getEnumValues(Color);
      this.groups = this.enumService.getEnumValues(Group);
      this.sortTypes = this.enumService.getEnumValues(SortType);
      this.titleTypes = this.enumService.getEnumValues(TitleType);
      this.languages = this.enumService.getEnumValues(Language);
      this.countries = this.enumService.getEnumValues(Country);
    }, err => console.log(err));

    this.isFilterSearchable = Utils.isDesktopScreen();
  }

  ngOnInit() {
    this.filterBarTopDefault = this.filterBar.nativeElement.getBoundingClientRect().top;
    window.addEventListener('scroll', this.onScrollChanged.bind(this));
  }

  explore() {
    this.query.UserRating.Min = this.ratingRange[0];
    this.query.UserRating.Max = this.ratingRange[1];

    if (this.yearRange[0])
      this.query.ReleaseDate.Min = new Date(this.yearRange[0] + '-01-01');
    if (this.yearRange[1])
      this.query.ReleaseDate.Max = new Date(this.yearRange[1] + '-12-31');

    if (this.onNetflix || this.onAmazon) {
      this.query.Companies = [];
      if (this.onNetflix)
        this.query.Companies.push(Compnay.Netflix)
      if (this.onAmazon)
        this.query.Companies.push(Compnay.AmazonPrime)
    }
    else
      this.query.Companies = null;

    this.dataService.changeQuery(this.query);

    if (!Utils.isDesktopScreen())
      this.triggerFilter(false);
  }

  triggerFilter(isFilterPanelVisible: boolean) {
    var elementsToTrigger = $([$('.cd-filter-trigger'), $('.cd-filter'), $('.cd-tab-filter'), $('.cd-gallery')]);
    elementsToTrigger.each(function () {
      $(this).toggleClass('filter-is-visible', isFilterPanelVisible);
    });
  }

  onScrollChanged() {
    if (window.pageYOffset > (this.filterBarTopDefault + 150))
      this.filterBar.nativeElement.classList.add('fixed-header');
    else
      this.filterBar.nativeElement.classList.remove('fixed-header');
  }

  clearFilter() {
    this.ratingRange = [null, null];
    this.yearRange = [null, null];

    this.query = new Query();
  }

  formatWithK(x: number) {
    if (x === 0)
      return x;

    return x.thousandFormat();
  }

  formatWithDot(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }


}
