import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FilterComponent,
    BarComponent,
    ContentComponent,
    MovieComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    I18nModule
  ],
  providers: [JsonApiService, ImdbSearhService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
