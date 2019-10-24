import { Injectable, ApplicationRef } from '@angular/core';
import { languages } from './languages.model';
import { config } from '../../../assets/config/imdb-explorer.config';
import { locale } from 'devextreme/localization';
import 'devextreme-intl';

import en from '../../../assets/api/langs/en.json';
import tr from '../../../assets/api/langs/tr.json';

@Injectable()
export class I18nService {

  public data: {};
  public currentLanguage: any;

  constructor(private ref: ApplicationRef) {

    let currentLanguageKey = localStorage.getItem('currentLanguageKey');
    if (!currentLanguageKey)
      this.initLanguage(navigator.language);
    else
      this.initLanguage(currentLanguageKey);

    this.fetch(this.currentLanguage.key);
  }

  private initLanguage(locale: string) {
    let language = languages.find(lang => lang.key === locale.toLowerCase() || lang.key2 === locale.toLowerCase());

    if (!language)
      language = languages.find(lang => lang.key === config.DEFAULT_LOCALE);

    this.currentLanguage = language;
  }

  private fetch(localeKey: any) {
    // this.jsonApiService.fetch(`/langs/${localeKey}.json`)
    //   .subscribe((data: any) => {
    //     this.data = data;
    //     this.state.next(data);
    //     this.ref.tick();
    //   });

    switch (localeKey) {
      case 'tr':
        this.data = tr;
        break;
      case 'en':
      default:
        this.data = en;
        break;
    }

    this.ref.tick();

    //Set locale for devexpress widgets
    locale(localeKey);

    localStorage.setItem('currentLanguageKey', localeKey);
  }

  setLanguage(language) {
    this.currentLanguage = language;
    this.fetch(language.key);
  }


  public getTranslation(phrase: string): string {
    return this.data && this.data[phrase] ? this.data[phrase] : phrase;
  }

}
