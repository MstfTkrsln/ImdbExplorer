import { Component, OnInit } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  constructor() { }

  ngOnInit() {


    // $('.cd-filter-trigger').on('click', function () {
    //   this.triggerFilter(true);
    // }.bind(this));
    // $('.cd-filter .cd-close').on('click', function () {
    //   this.triggerFilter(false);
    // }.bind(this));

  }

  triggerFilter($bool) {
    var elementsToTrigger = $([$('.cd-filter-trigger'), $('.cd-filter'), $('.cd-tab-filter'), $('.cd-gallery')]);
    elementsToTrigger.each(function () {
      $(this).toggleClass('filter-is-visible', $bool);
    });
  }

}
