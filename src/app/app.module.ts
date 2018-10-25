import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { InterpolatedChartModule } from 'ng-interpolated-charts';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    InterpolatedChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
