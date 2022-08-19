import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {MaterialModule} from '../../material/material.module';
import {AnimateInModule} from '../../animate-in/animate-in.module';
import {BoxesComponent} from '../../components/backgrounds/boxes/boxes.component';
import {FirefliesComponent} from '../../components/backgrounds/fireflies/fireflies.component';
import {observerServiceConfig} from '../../animate-in/animate-in.model';

@NgModule({
  declarations: [
    HomeComponent,
    BoxesComponent,
    FirefliesComponent
  ],
  imports: [
    MaterialModule,
    AnimateInModule.forRoot(observerServiceConfig)
  ],
  exports: [
    HomeComponent,
    BoxesComponent,
    FirefliesComponent
  ]
})
export class HomeModule {
}
