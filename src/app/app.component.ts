import { Component, OnInit } from '@angular/core';

declare const $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    
    $('.cd-filter-trigger').on('click', function () {
      this.triggerFilter(true);
    }.bind(this));
    $('.cd-filter .cd-close').on('click', function () {
      this.triggerFilter(false);
    }.bind(this));

    $('.cd-gallery ul').mixItUp({
      controls: {
        enable: true
      },
      callbacks: {
        onMixStart: function () {
          $('.cd-fail-message').fadeOut(200);
        },
        onMixFail: function () {
          $('.cd-fail-message').fadeIn(200);
        }
      }
    });

  }

  triggerFilter($bool) {
    var elementsToTrigger = $([$('.cd-filter-trigger'), $('.cd-filter'), $('.cd-tab-filter'), $('.cd-gallery')]);
    elementsToTrigger.each(function () {
      $(this).toggleClass('filter-is-visible', $bool);
    });
  }

}
