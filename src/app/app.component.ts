import { Component, OnInit, ViewChild, ElementRef, OnDestroy, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { Utils } from './components/shared/utils';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, AfterContentChecked {
  @ViewChild('backToTopButton') backToTopButton: ElementRef;

  private currentUrl: string;
  private querySub: any;

  constructor(private changeDetector: ChangeDetectorRef, private dataService: DataService) {
    this.querySub = this.dataService.CurrentQuery.subscribe(q => { this.currentUrl = window.location.href; });

    //triggered twice - bug exist
    // this.routerSub = this.router.events.subscribe(event => {
    //   if (event instanceof ResolveEnd) 
    // });
  }

  ngOnInit() {
    window.addEventListener('scroll', this.onScrollChanged.bind(this));
  }

  ngOnDestroy() {
    this.querySub.unsubscribe();
  }

  ngAfterContentChecked() {
    this.changeDetector.detectChanges();
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
