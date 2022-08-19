import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FirefliesComponent} from './components/backgrounds/fireflies/fireflies.component';
import {BoxesComponent} from './components/backgrounds/boxes/boxes.component';
import {HomeComponent} from './forms/home/home.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {BarChartComponent} from './components/bar-chart/bar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    FirefliesComponent,
    BoxesComponent,
    HomeComponent,
    BarChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
