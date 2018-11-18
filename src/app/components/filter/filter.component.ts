import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Query } from 'src/app/models/query/query';
import { EnumTranslatorService } from 'src/app/services/enum-translater-service';
import { Genre, Color, Group, SortType, TitleType, Language, Country } from 'src/app/models/enums';
import { KeyValuePair } from 'src/app/models/key-value-pair';

declare const $: any;

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Output() onSearch = new EventEmitter<Query>();

  private query: Query;

  private genres: KeyValuePair[];
  private colors: KeyValuePair[];
  private groups: KeyValuePair[];
  private sortTypes: KeyValuePair[];
  private titleTypes: KeyValuePair[];
  private languages: KeyValuePair[];
  private countries: KeyValuePair[];


  private ratingRangeTitle: string = 'Rating';

  constructor(private enumService: EnumTranslatorService) {
    this.query = new Query();

    setTimeout(() => {
      this.genres = this.enumService.getEnumValues(Genre);
      this.colors = this.enumService.getEnumValues(Color);
      this.groups = this.enumService.getEnumValues(Group);
      this.sortTypes = this.enumService.getEnumValues(SortType);
      this.titleTypes = this.enumService.getEnumValues(TitleType);
      this.languages = this.enumService.getEnumValues(Language);
      this.countries = this.enumService.getEnumValues(Country);
    });
  }

  ngOnInit() {
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

  triggerFilter($bool) {
    var elementsToTrigger = $([$('.cd-filter-trigger'), $('.cd-filter'), $('.cd-tab-filter'), $('.cd-gallery')]);
    elementsToTrigger.each(function () {
      $(this).toggleClass('filter-is-visible', $bool);
    });
  }

}
