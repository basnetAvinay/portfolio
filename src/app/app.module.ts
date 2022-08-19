import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FirefliesComponent} from './components/backgrounds/fireflies/fireflies.component';
import {BoxesComponent} from './components/backgrounds/boxes/boxes.component';
import {HomeComponent} from './forms/home/home.component';
import {BarChartComponent} from './components/charts/bar-chart/bar-chart.component';
import {MaterialModule} from './material/material.module';
import {SkillComponent} from './forms/skill/skill.component';
import {AnimateInModule} from './animate-in/animate-in.module';

@NgModule({
  declarations: [
    AppComponent,
    FirefliesComponent,
    BoxesComponent,
    HomeComponent,
    BarChartComponent,
    SkillComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    AnimateInModule.forRoot({
      threshold: 0,
      rootMargin: '-100px'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
