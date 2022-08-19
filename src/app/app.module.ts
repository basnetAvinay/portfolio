import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FirefliesComponent} from './components/backgrounds/fireflies/fireflies.component';
import {BoxesComponent} from './components/backgrounds/boxes/boxes.component';
import {HomeComponent} from './forms/home/home.component';
import {BarChartComponent} from './components/charts/bar-chart/bar-chart.component';
import {MaterialModule} from "./material/material.module";
import {SkillComponent} from './forms/skill/skill.component';
import {TooltipDirective} from "./directives/tooltip.directive";

@NgModule({
  declarations: [
    AppComponent,
    FirefliesComponent,
    BoxesComponent,
    HomeComponent,
    BarChartComponent,
    SkillComponent,
    TooltipDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
