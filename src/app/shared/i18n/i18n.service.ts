import { Injectable, ApplicationRef } from '@angular/core';

import { languages } from './languages.model';
import { config } from '../../../assets/config/imdb-explorer.config';
import { Subject } from 'rxjs/internal/Subject';
import { JsonApiService } from 'src/app/core/api/json-api.service';


@Injectable()
export class I18nService {

  public state;
  public data: {};
  public currentLanguage: any;


  constructor(private jsonApiService: JsonApiService, private ref: ApplicationRef) {
    this.state = new Subject();

    let currentLanguageKey = localStorage.getItem('currentLanguageKey');
    if (!currentLanguageKey)
      this.initLanguage(config.DEFAULT_LOCALE);
    else
      this.initLanguage(currentLanguageKey);

    this.fetch(this.currentLanguage.key);
  }

  private fetch(localeKey: any) {
    this.jsonApiService.fetch(`/langs/${localeKey}.json`)
      .subscribe((data: any) => {
        this.data = data;
        this.state.next(data);
        this.ref.tick();
      });

    localStorage.setItem('currentLanguageKey', localeKey);
  }

  private initLanguage(locale: string) {
    let language = languages.find((it) => {
      return it.key === locale;
    });
    if (language) {
      this.currentLanguage = language;
    } else {
      throw new Error(`Incorrect locale used for I18nService: ${locale}`);

    }
  }

  setLanguage(language) {
    this.currentLanguage = language;
    this.fetch(language.key);
  }


  subscribe(sub: any, err: any) {
    return this.state.subscribe(sub, err);
  }

  public getTranslation(phrase: string): string {
    return this.data && this.data[phrase] ? this.data[phrase] : phrase;
  }

}
