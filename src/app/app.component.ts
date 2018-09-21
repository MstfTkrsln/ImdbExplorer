import { Component, OnInit } from '@angular/core';
import { ImdbSearhService } from './services/imdb-search.service';
import { Query } from './models/query/query';
import { TitleType, Genre, Group, Color, Language, Country, Sort } from 'src/app/models/enums';
import { ReleaseDate } from './models/query/release-date';
import { UserRating } from './models/query/user-rating';
import { NumVotes } from './models/query/num-votes';
import { MovieMeter } from './models/query/movie-meter';

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

     this.mixAnimation();
    
    // this.imdbService.Search(Query.getSample())
    //   .subscribe(res => {
    //     console.log(res);
    //   });     

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
