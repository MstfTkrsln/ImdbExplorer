import { Component, OnInit } from '@angular/core';
import { ImdbSearhService } from './services/imdb-search.service';
import { Query } from 'src/app/models/query';
import { TitleType, Genre, Group, Color, Language, Country, Sort } from 'src/app/models/enums';
import { ReleaseDate } from 'src/app/models/release-date';
import { UserRating } from 'src/app/models/user-rating';
import { NumVotes } from 'src/app/models/num-votes';
import { MovieMeter } from 'src/app/models/movie-meter';

declare const $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private imdbService: ImdbSearhService) {

  }
  ngOnInit() {

    // this.mixAnimation();
    
    this.imdbService.Search(Query.getSample())
      .subscribe(res => {
        console.log(res);
      });     

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
