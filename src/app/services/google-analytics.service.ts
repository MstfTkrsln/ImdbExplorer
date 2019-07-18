import { Injectable } from "@angular/core";

declare const gtag: any;

@Injectable()
export class GoogleAnalyticsService {

    public sendPageView(uri: string) {
        gtag('config', 'UA-128905801-1', { 'page_path': uri });
    }

    public emitEvent(eventCategory: string, eventAction: string, eventLabel: string = null, eventValue: number = null) {
        gtag('event', eventAction, {
            'event_category': eventCategory,
            'event_label': eventLabel,
            'value': eventValue
        });
    }
}