import {NgModule} from '@angular/core';
import {SkillComponent} from './skill.component';
import {BarChartModule} from '../../components/charts/bar-chart/bar-chart.module';
import {MaterialModule} from '../../material/material.module';
import {AnimateInModule} from '../../animate-in/animate-in.module';
import {observerServiceConfig} from '../../animate-in/animate-in.model';

@NgModule({
  declarations: [SkillComponent],
  imports: [
    BarChartModule,
    MaterialModule,
    AnimateInModule.forRoot(observerServiceConfig)
  ],
  exports: [SkillComponent]
})
export class SkillModule {
}
