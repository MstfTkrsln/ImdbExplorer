import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { Movie } from 'src/app/models/movie';

import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BlockTemplateComponent } from 'src/app/shared/ui-block/block-template.component';
import { SearchResult } from 'src/app/models/search-result';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, OnChanges {
  @Input() searchResult: SearchResult;
  @Input() isBlockingActive: boolean = false;
  @Input() isSpinnerVisible: boolean = false;
  @Output() onShowMore = new EventEmitter();

  @BlockUI('content-section') blockUI: NgBlockUI;
  blockTemplate = BlockTemplateComponent;

  constructor() {
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
    this.onShowMore.emit();
  }

}
