import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { Query } from 'src/app/models/query/query';
import { EnumTranslatorService } from 'src/app/services/enum-translater-service';
import { Genre, Color, Group, SortType, TitleType, Language, Country } from 'src/app/models/enums';
import { KeyValuePair } from 'src/app/models/key-value-pair';
import { Utils } from '../shared/utils';
import { I18nService } from 'src/app/shared/i18n/i18n.service';

declare const $: any;

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @ViewChild('filterBar') filterBar: ElementRef;
  @Output() onSearch = new EventEmitter<Query>();

  filterBarTopDefault: number;

  query: Query;

  genres: KeyValuePair[];
  colors: KeyValuePair[];
  groups: KeyValuePair[];
  sortTypes: KeyValuePair[];
  titleTypes: KeyValuePair[];
  languages: KeyValuePair[];
  countries: KeyValuePair[];

  ratingRangeTitle: string = 'Rating';

  isFilterSearchable: boolean = true;

  constructor(private enumService: EnumTranslatorService) {
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
    console.log(this.query);
    this.onSearch.emit(this.query);
  }

  onRatingChanged(e) {
    this.query.UserRating.Min = e.value[0];
    this.query.UserRating.Max = e.value[1];

    this.ratingRangeTitle = `Rating (${this.query.UserRating.Min} - ${this.query.UserRating.Max})`;
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
}
