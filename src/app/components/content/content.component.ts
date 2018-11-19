import { Component, OnInit, Input, AfterViewInit, OnChanges } from '@angular/core';
import { Movie } from '../../models/movie';

declare const $: any;

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, OnChanges {

  @Input() movies: Movie[];

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes) {
  }

}
