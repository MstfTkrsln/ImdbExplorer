import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FilterComponent } from 'src/app/components/filter/filter.component';
import { BarComponent } from 'src/app/components/bar/bar.component';
import { ContentComponent } from 'src/app/components/content/content.component';
import { MovieComponent } from './components/shared/movie/movie.component';
import { I18nModule } from './shared/i18n/i18n.module';
import { JsonApiService } from './core/api/json-api.service';
import { ImdbSearhService } from './services/imdb-search.service';
import { HttpModule } from '@angular/http';

import 'src/app/core/extensions/extensions';
import { CommaSeperatedPipe } from './pipes/comma-seperated.pipe';
import { EnumTranslatorService } from 'src/app/services/enum-translater-service';

import { BlockUIModule } from 'ng-block-ui';
import { BlockTemplateComponent } from './shared/ui-block/block-template.component';

import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxRangeSelectorModule } from 'devextreme-angular/ui/range-selector';
import { DxTagBoxModule } from 'devextreme-angular/ui/tag-box';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxDateBoxModule } from 'devextreme-angular/ui/date-box';
import { DxNumberBoxModule } from 'devextreme-angular/ui/number-box';
import { DxSliderModule } from 'devextreme-angular/ui/slider';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    I18nModule,
    BlockUIModule.forRoot(),

    DxButtonModule,
    DxRangeSelectorModule,
    DxTagBoxModule,
    DxSelectBoxModule,
    DxDateBoxModule,
    DxNumberBoxModule,
    DxTextBoxModule,
    DxSliderModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    FilterComponent,
    BarComponent,
    ContentComponent,
    MovieComponent,
    CommaSeperatedPipe,
    BlockTemplateComponent
  ],
  providers: [JsonApiService, ImdbSearhService, EnumTranslatorService],
  entryComponents: [BlockTemplateComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
