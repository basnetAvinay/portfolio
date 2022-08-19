import {NgModule} from '@angular/core';
import {BarChartComponent} from './bar-chart.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [BarChartComponent],
  imports: [CommonModule],
  exports: [BarChartComponent]
})
export class BarChartModule {
}
