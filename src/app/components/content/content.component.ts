import { Component, OnInit, Input, AfterViewInit, OnChanges } from '@angular/core';
import { Movie } from '../../models/movie';

declare const $: any;

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() movies: Movie[];

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.mixAnimation();
  }

  ngOnChanges(changes) {
    console.log(changes);

    if (changes.movies) {
      setTimeout(() => {
        this.mixAnimation();
      });
    }
  }

  private mixAnimation() {
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

}
