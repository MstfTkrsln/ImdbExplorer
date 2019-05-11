import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { Movie } from 'src/app/models/movie';

import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BlockTemplateComponent } from 'src/app/shared/ui-block/block-template.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, OnChanges {
  @Input() movies: Movie[];
  @Input() isLoaderActive: boolean = false;

  @Output() onShowMore = new EventEmitter();

  @BlockUI('content-section') blockUI: NgBlockUI;
  blockTemplate = BlockTemplateComponent;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (changes.isLoaderActive) {
      if (changes.isLoaderActive.currentValue)
        this.startLoader("Exploring...");
      else
        this.stopLoader();
    }
  }

  startLoader(message: string) {
    this.blockUI.start(message);
  }

  stopLoader() {
    this.blockUI.stop();
  }

  showMore() {
    this.onShowMore.emit();
  }

}
