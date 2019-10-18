import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { LayoutState } from '../models/layout-state';

const state: LayoutState = new LayoutState(true);

@Injectable()
export class LayoutService {
  state: LayoutState;

  private subject: Subject<LayoutState>;

  constructor() {
    this.subject = new Subject();
    this.state = state;
    this.trigger();
  }

  trigger() {
    this.subject.next(this.state)
  }

  subscribe(next, err?, complete?) {
    return this.subject.subscribe(next, err, complete)
  }

  onFilterPanelToggle(value) {
    this.state.filterPanelVisible = value;
    this.trigger();
  }

}
