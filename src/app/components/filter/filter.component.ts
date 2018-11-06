import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Query } from 'src/app/models/query/query';

declare const $: any;

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Output() onSearch = new EventEmitter<Query>();

  private query: Query;

  constructor() {
    this.query = new Query();
  }

  ngOnInit() {
  }

  explore() {
    this.onSearch.emit(this.query);
  }

  triggerFilter($bool) {
    var elementsToTrigger = $([$('.cd-filter-trigger'), $('.cd-filter'), $('.cd-tab-filter'), $('.cd-gallery')]);
    elementsToTrigger.each(function () {
      $(this).toggleClass('filter-is-visible', $bool);
    });
  }

}
