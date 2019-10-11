import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Utils } from './components/shared/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('backToTopButton') backToTopButton: ElementRef;
  
  constructor() {
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     this.gas.sendPageView(event.urlAfterRedirects);
    //   }
    // });
  }
  
  // getLastPartOfUri) {
  //   return location.pathname.substr(1)
  // }

  ngOnInit() {
    window.addEventListener('scroll', this.onScrollChanged.bind(this));
  }

  backToTop() {
    Utils.backToTop();
  }

  onScrollChanged() {
    if (window.scrollY > 300) {
      this.backToTopButton.nativeElement.classList.add('show');
    } else {
      this.backToTopButton.nativeElement.classList.remove('show');
    }
  }

}
