import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BlockTemplateComponent } from 'src/app/shared/ui-block/block-template.component';
import { SearchResult } from 'src/app/models/search-result';
import { DataService } from 'src/app/services/data.service';
import { ImdbSearhService } from 'src/app/services/imdb-search.service';
import { Query } from 'src/app/models/query/query';
import { Utils } from '../shared/utils';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  searchResult: SearchResult;
  isSpinnerVisible: boolean = false;

  @BlockUI('content-section') blockUI: NgBlockUI;
  blockTemplate = BlockTemplateComponent;

  constructor(private imdbService: ImdbSearhService, private dataService: DataService) {
    this.dataService.CurrentQuery.subscribe(query => this.search(query));
    this.dataService.NextPageQuery.subscribe(query => this.nextPage(query));
    this.dataService.CurrentResult.subscribe(result => this.searchResult = result);
  }

  ngOnInit() {
  }

  search(query: Query) {
    this.startBlocking("Exploring...");

    console.log(query);

    this.imdbService.Search(query)
      .subscribe(result => {

        console.log(result);

        this.dataService.updateResult(result)
      },
        (error) => {
          console.log(error);
          this.stopBlocking();
        },
        () => {
          this.stopBlocking();
        });

    Utils.backToTop();
  }

  nextPage(query: Query) {
    this.isSpinnerVisible = true;

    console.log(query);

    this.imdbService.Search(query)
      .subscribe(result => {
        console.log(result);

        this.dataService.concatResult(result);
      },
        (error) => {
          console.log(error);
          this.isSpinnerVisible = false;
        },
        () => {
          this.isSpinnerVisible = false;
        });
  }

  startBlocking(message: string) {
    this.blockUI.start(message);
  }

  stopBlocking() {
    this.blockUI.stop();
  }

  showMore() {
    this.dataService.nextPage();
  }

}
