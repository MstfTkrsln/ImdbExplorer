import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ImdbSearhService } from './services/imdb-search.service';
import { Query } from './models/query/query';
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

  isSearching: boolean = false;
  isLoadingMore: boolean = false;

  constructor(private imdbService: ImdbSearhService, private dataService: DataService) {
  }

  ngOnInit() {
    window.addEventListener('scroll', this.onScrollChanged.bind(this));

    this.dataService.CurrentQuery.subscribe(query => this.search(query));
    this.dataService.NextPageQuery.subscribe(query => this.nextPage(query));
  }

  // getLastPartOfUri) {
  //   return location.pathname.substr(1)
  // }

  search(query: Query) {
    this.startSearching();

    console.log(query);

    this.imdbService.Search(query)
      .subscribe(result => {

        console.log(result);

        this.dataService.updateResult(result)
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

        this.dataService.concatResult(result);
      },
        (error) => {
          console.log(error);
          this.isLoadingMore = false;
        },
        () => {
          this.isLoadingMore = false;
        });
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
