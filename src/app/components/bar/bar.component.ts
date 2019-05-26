import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Utils } from '../shared/utils';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {
  @ViewChild('navbar') navbar: ElementRef;

  constructor() {
  }

  ngOnInit() {
    window.addEventListener('scroll', this.onScrollChanged.bind(this));
  }

  onScrollChanged() {
    if (Utils.isFixedMode())
      this.navbar.nativeElement.classList.add('fixed-header');
    else
      this.navbar.nativeElement.classList.remove('fixed-header');
  }

}
