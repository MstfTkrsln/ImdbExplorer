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

import { DxButtonModule,DxRangeSelectorModule,DxTagBoxModule,DxSelectBoxModule,DxDateBoxModule,DxNumberBoxModule ,DxTextBoxModule} from 'devextreme-angular';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FilterComponent,
    BarComponent,
    ContentComponent,
    MovieComponent,
    CommaSeperatedPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    I18nModule,
    DxButtonModule,
    DxRangeSelectorModule,
    DxTagBoxModule,
    DxSelectBoxModule,
    DxDateBoxModule,
    DxNumberBoxModule,
    DxTextBoxModule
  ],
  providers: [JsonApiService, ImdbSearhService, EnumTranslatorService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
