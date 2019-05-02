import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ImdbSearhService } from './services/imdb-search.service';
import { Query } from './models/query/query';
import { SearchResult } from './models/search-result';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BlockTemplateComponent } from 'src/app/shared/ui-block/block-template.component';

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

  searchResult: SearchResult;
  isSearching: boolean = false;

  constructor(private imdbService: ImdbSearhService) {
    this.onSearch(Query.getQueryForPopular());
  }

  ngOnInit() {
    window.addEventListener('scroll', this.onScrollChanged.bind(this));
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

  backToTop(e) {
    e.preventDefault();
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
