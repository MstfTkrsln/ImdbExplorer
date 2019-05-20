import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ImdbSearhService } from './services/imdb-search.service';
import { Query } from './models/query/query';
import { SearchResult } from './models/search-result';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BlockTemplateComponent } from 'src/app/shared/ui-block/block-template.component';
import { DataService } from './services/data.service';

declare const $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('backToTopButton') backToTopButton: ElementRef;

  @BlockUI('content-section') blockUI: NgBlockUI;
  blockTemplate = BlockTemplateComponent;

  CurrentQuery: Query;

  searchResult: SearchResult;
  isSearching: boolean = false;
  isLoadingMore: boolean = false;

  currentPage: number;

  constructor(private imdbService: ImdbSearhService, private dataService: DataService) {
  }

  ngOnInit() {
    window.addEventListener('scroll', this.onScrollChanged.bind(this));

    this.dataService.CurrentQuery.subscribe(query => this.onSearch(query))
  }

  // getLastPartOfUri) {
  //   return location.pathname.substr(1)
  // }

  onSearch(query: Query) {
    this.startSearching();

    console.log(query);

    this.CurrentQuery = query;
    this.currentPage = this.CurrentQuery.Page;

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

    this.backToTop();
  }

  nextPage(query: Query) {
    this.isLoadingMore = true;

    console.log(query);

    this.imdbService.Search(query)
      .subscribe(result => {
        console.log(result);

        this.searchResult.Count = result.Count;
        this.searchResult.First = result.First;
        this.searchResult.Last = result.Last;
        this.searchResult.TotalCount = result.TotalCount;
        this.searchResult.SearchUrl = result.SearchUrl;
        this.searchResult.Movies.push(...result.Movies);
      },
        (error) => {
          console.log(error);
          this.isLoadingMore = false;
        },
        () => {
          this.isLoadingMore = false;
        });
  }

  onShowMore() {
    let nextPageQuery = this.CurrentQuery.deepCopy();
    nextPageQuery.Page = ++this.currentPage;
    this.nextPage(nextPageQuery);
  }

  startSearching() {
    this.isSearching = true;
  }

  stopSearching() {
    this.isSearching = false;
  }

  backToTop() {
    $('html, body').animate({ scrollTop: 0 }, '300');
  }

  onScrollChanged() {
    if (window.scrollY > 300) {
      this.backToTopButton.nativeElement.classList.add('show');
    } else {
      this.backToTopButton.nativeElement.classList.remove('show');
    }
  }

}
