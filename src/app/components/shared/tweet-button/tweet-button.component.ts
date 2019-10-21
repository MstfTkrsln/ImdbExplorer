import { Component, ChangeDetectionStrategy, ElementRef, Renderer, Input, Output, OnInit, OnChanges, EventEmitter } from '@angular/core';
import { GoogleAnalyticsService } from 'src/app/services/google-analytics.service';

interface ShareButtonOptions {
  text?: string;
  hashtags?: string;
  via?: string;
  related?: string;

  size?: string;
  lang?: string;
  dnt?: boolean;
}

@Component({
  selector: "tweet-button",
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TweetButtonComponent implements OnInit, OnChanges {

  @Input() location: string;
  @Input() text: string;
  @Input() hashtags: string;
  @Input() via: string;
  @Input() related: string;
  @Input() size: string;
  @Input() lang: string;
  @Input() dnt: boolean;

  @Output() load: EventEmitter<any> = new EventEmitter<any>();

  constructor(private element: ElementRef, private renderer: Renderer, private gas: GoogleAnalyticsService) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (changes.location)
      this.loadWidget();
  }

  loadWidget() {
    if (this.element.nativeElement.children.length > 0) { //if widget.js script is exist
      if (this.element.nativeElement.children.length > 1)  //if button is exist
        while (this.element.nativeElement.firstChild != this.element.nativeElement.lastChild)
          this.element.nativeElement.lastChild.remove();

      return this.renderShareButton();
    }
    else {
      let script = this.renderer.createElement(this.element.nativeElement, "script");
      script.src = "//platform.twitter.com/widgets.js";
      return new Promise(resolve => {
        this.renderer.listen(script, "load", () => {
          this.renderShareButton()
            .then(() => {
              (window as any).twttr.events.bind('click', this.tweetButtonClicked.bind(this));
              resolve();
            });
        });
      });
    }
  }

  private isRenderingNow = false;
  private renderShareButton(): Promise<any> {
    if (!(window as any).twttr || this.isRenderingNow)
      return;

    this.isRenderingNow = true;

    return (window as any).twttr.widgets.createShareButton(
      this.location || location.href,
      this.element.nativeElement,
      <ShareButtonOptions>{
        text: this.text || null,
        hashtags: this.hashtags || null,
        via: this.via || null,
        related: this.related || null,
        size: this.size || null,
        lang: this.lang || null,
        dnt: this.dnt || null
      }
    ).then((el: HTMLIFrameElement) => {
      this.isRenderingNow = false;
      el.style.visibility = null;
      el.style.height = null;
      el.style.width = null;
      this.load.emit(el);
    });
  }

  tweetButtonClicked() {
    this.gas.emitEvent("share", "tweet");
  }
}
