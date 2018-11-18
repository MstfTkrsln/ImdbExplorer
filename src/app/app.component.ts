import { Component, OnInit } from '@angular/core';
import { ImdbSearhService } from './services/imdb-search.service';
import { Query } from './models/query/query';
import { TitleType, Genre, Group, Color, Language, Country, SortType } from 'src/app/models/enums';
import { ReleaseDate } from './models/query/release-date';
import { UserRating } from './models/query/user-rating';
import { NumVotes } from './models/query/num-votes';
import { MovieMeter } from './models/query/movie-meter';
import { SearchResult } from './models/search-result';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  searchResult: SearchResult;

  constructor(private imdbService: ImdbSearhService) {

  }
  ngOnInit() {
  }

  onSearch(query: Query) {
    this.imdbService.Search(query)
      .subscribe(result => {
        console.log(result);
        this.searchResult = result;
      });
  }

}
