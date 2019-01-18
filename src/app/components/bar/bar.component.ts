import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {
  @ViewChild('navbar') navbar: ElementRef;

  navbarTopDefault: number;

  constructor() {
  }

  ngOnInit() {
    this.navbarTopDefault = this.navbar.nativeElement.getBoundingClientRect().top;
    window.addEventListener('scroll', this.onScrollChanged.bind(this));
  }

  onScrollChanged() {
    if (window.pageYOffset > (this.navbarTopDefault + 150))
      this.navbar.nativeElement.classList.add('fixed-header');
    else
      this.navbar.nativeElement.classList.remove('fixed-header');
  }

}
