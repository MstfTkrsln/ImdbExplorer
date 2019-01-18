import { Component, OnInit } from '@angular/core';
import { ImdbSearhService } from './services/imdb-search.service';
import { Query } from './models/query/query';
import { SearchResult } from './models/search-result';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  searchResult: SearchResult;

  constructor(private imdbService: ImdbSearhService) {
    this.onSearch(Query.getQueryForPopularMovies());
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
