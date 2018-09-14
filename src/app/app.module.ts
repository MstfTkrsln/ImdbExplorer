import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FilterComponent } from 'src/app/components/filter/filter.component';
import { BarComponent } from 'src/app/components/bar/bar.component';
import { ContentComponent } from 'src/app/components/content/content.component';
import { MovieComponent } from 'src/app/components/shared/movie.component';

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
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
