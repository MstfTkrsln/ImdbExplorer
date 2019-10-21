import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BlockTemplateComponent } from 'src/app/shared/ui-block/block-template.component';
import { SearchResult } from 'src/app/models/search-result';
import { DataService } from 'src/app/services/data.service';
import { ImdbSearhService } from 'src/app/services/imdb-search.service';
import { Query } from 'src/app/models/query/query';
import { Utils } from '../shared/utils';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { LayoutService } from 'src/app/services/layout.service';
import { LayoutState } from 'src/app/models/layout-state';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, OnDestroy {
  searchResult: SearchResult;
  isSpinnerVisible: boolean = false;

  @BlockUI('content-section') blockUI: NgBlockUI;
  blockTemplate = BlockTemplateComponent;

  private query: Query;

  private querySub: Subscription;
  private nextPageSub: Subscription;
  private resultSub: Subscription;

  layoutState: LayoutState;

  constructor(private route: ActivatedRoute, private layoutService: LayoutService, private imdbService: ImdbSearhService, private dataService: DataService) {
    this.querySub = this.dataService.CurrentQuery.subscribe(query => this.search(query));
    this.nextPageSub = this.dataService.NextPageQuery.subscribe(query => this.nextPage(query));
    this.resultSub = this.dataService.CurrentResult.subscribe(result => { this.searchResult = result; });

    this.layoutState = this.layoutService.state;
  }

  ngOnInit() {
    //from routing
    this.route.data.subscribe(data => {
      if (data.query)
        this.dataService.changeQuery(data.query.deepCopy());
    });
  }

  ngOnDestroy() {
    this.querySub.unsubscribe();
    this.nextPageSub.unsubscribe();
    this.resultSub.unsubscribe();
  }

  search(query: Query) {
    this.query = query;
    this.startBlocking("Exploring...");

    //console.log(query);
    this.imdbService.Search(query)
      .subscribe(result => {
        //console.log(result);
        this.dataService.updateResult(result);
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

    //console.log(query);
    this.imdbService.Search(query)
      .subscribe(newResult => {
        //console.log(newResult);
        this.dataService.concatResult(this.searchResult, newResult);
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
    this.dataService.nextPage(this.query);
  }

}
