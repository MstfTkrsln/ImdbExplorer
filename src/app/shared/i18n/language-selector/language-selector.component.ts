import { Component, OnInit, OnChanges } from '@angular/core';
import { languages } from '../languages.model';
import { I18nService } from 'src/app/shared/i18n/i18n.service';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.css']
})
export class LanguageSelectorComponent implements OnInit {


  public languages: Array<any>;
  public currentLanguage: any;

  constructor(private i18n: I18nService) {
  }

  ngOnInit() {
    this.languages = languages;
    this.currentLanguage = this.i18n.currentLanguage;
  }

  onLanguageChanged(e) {
   if(e.value)
      this.setLanguage(e.value);
  }

  setLanguage(language) {
    this.i18n.setLanguage(language);
    location.reload();
  }

}
