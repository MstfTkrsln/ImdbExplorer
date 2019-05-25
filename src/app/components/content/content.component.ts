import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BlockTemplateComponent } from 'src/app/shared/ui-block/block-template.component';
import { SearchResult } from 'src/app/models/search-result';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, OnChanges {
  @Input() isBlockingActive: boolean = false;
  @Input() isSpinnerVisible: boolean = false;

  @BlockUI('content-section') blockUI: NgBlockUI;
  blockTemplate = BlockTemplateComponent;

  searchResult: SearchResult;

  constructor(private dataService: DataService) {
    this.dataService.CurrentResult.subscribe(result => this.searchResult = result);
  }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (changes.isBlockingActive) {
      if (changes.isBlockingActive.currentValue)
        this.startBlocking("Exploring...");
      else
        this.stopBlocking();
    }
    if (changes.isSpinnerVisible) {
      if (changes.isSpinnerVisible.currentValue)
        this.isSpinnerVisible = true;
      else
        this.isSpinnerVisible = false;
    }
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
