import { Component, OnInit } from '@angular/core';
import { ImdbSearhService } from './services/imdb-search.service';
import { Query } from './models/query/query';
import { SearchResult } from './models/search-result';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BlockTemplateComponent } from 'src/app/shared/ui-block/block-template.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @BlockUI('content-section') blockUI: NgBlockUI;
  blockTemplate = BlockTemplateComponent;

  searchResult: SearchResult;
  isSearching: boolean = false;

  constructor(private imdbService: ImdbSearhService) {
    this.onSearch(Query.getQueryForPopular());
  }

  ngOnInit() {
  }

  onSearch(query: Query) {
    this.startSearching();

    console.log(query);    

    this.imdbService.Search(query)
      .subscribe(result => {
        console.log(result);
        this.searchResult = result;
      },
        (error) => {
          console.log(error);
          this.stopSearching();
        },
        () => {
          this.stopSearching();
        });
  }

  startSearching() {
    this.isSearching = true;
  }

  stopSearching() {
    this.isSearching = false;
  }

}
