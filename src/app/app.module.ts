import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FirefliesComponent } from './components/backgrounds/fireflies/fireflies.component';
import { BoxesComponent } from './components/backgrounds/boxes/boxes.component';

@NgModule({
  declarations: [
    AppComponent,
    FirefliesComponent,
    BoxesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
