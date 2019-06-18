import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Query } from 'src/app/models/query/query';
import { EnumTranslatorService } from 'src/app/services/enum-translater-service';
import { Genre, Color, Group, SortType, TitleType, Language, Country, Company } from 'src/app/models/enums';
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
  @ViewChild('filterForm') filterForm: ElementRef;

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

  minNumVotes: number = 0;

  constructor(private enumService: EnumTranslatorService, private dataService: DataService) {
    this.query = new Query();

    this.enumService.onReady.subscribe(() => {
      this.genres = this.enumService.getEnumValues(Genre, true);
      this.colors = this.enumService.getEnumValues(Color);
      this.groups = this.enumService.getEnumValues(Group);
      this.sortTypes = this.enumService.getEnumValues(SortType);
      this.titleTypes = this.enumService.getEnumValues(TitleType);
      this.languages = this.enumService.getEnumValues(Language, true);
      this.countries = this.enumService.getEnumValues(Country, true);
    }, err => console.log(err));

    this.isFilterSearchable = Utils.isDesktopScreen();
  }

  ngOnInit() {
    window.addEventListener('scroll', this.onScrollChanged.bind(this));
  }

  explore() {
    this.setFilters();

    this.dataService.changeQuery(this.query.deepCopy());

    if (!Utils.isDesktopScreen())
      this.triggerFilter(false);
  }

  setFilters() {
    this.query.UserRating.Min = this.ratingRange[0];
    this.query.UserRating.Max = this.ratingRange[1];

    if (this.yearRange[0])
      this.query.ReleaseDate.Min = new Date(this.yearRange[0] + '-01-01');
    if (this.yearRange[1])
      this.query.ReleaseDate.Max = new Date(this.yearRange[1] + '-12-31');

    if (this.onNetflix || this.onAmazon) {
      this.query.Companies = [];
      if (this.onNetflix)
        this.query.Companies.push(Company.Netflix)
      if (this.onAmazon)
        this.query.Companies.push(Company.AmazonPrime)
    }
    else
      this.query.Companies = undefined;

    if (this.minNumVotes > 0)
      this.query.NumVotes.Min = this.minNumVotes;
    else
      this.query.NumVotes.Min = null;
  }

  triggerFilter(isFilterPanelVisible: boolean) {
    var elementsToTrigger = $([$('.cd-filter-trigger'), $('.cd-filter'), $('.cd-tab-filter'), $('.cd-gallery')]);
    elementsToTrigger.each(function () {
      $(this).toggleClass('filter-is-visible', isFilterPanelVisible);
    });
  }

  onScrollChanged() {
    if (Utils.isFixedMode()) {
      this.filterBar.nativeElement.classList.add('fixed-header');
      this.filterForm.nativeElement.classList.add('fit-screen-fixed-header');
    }
    else {
      this.filterBar.nativeElement.classList.remove('fixed-header');
      this.filterForm.nativeElement.classList.remove('fit-screen-fixed-header');
    }
  }

  clearFilter() {
    this.ratingRange = [null, null];
    this.yearRange = [null, null];
    this.onNetflix = false;
    this.onAmazon = false;
    this.minNumVotes = 0;

    this.query = new Query();
  }

  formatWithK(x: number) {
    if (x === 0)
      return x;

    return x.thousandFormat();
  }

  formatWithDot(x: number) {
    return x.formatWithDot();
  }


}
