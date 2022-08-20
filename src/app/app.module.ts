import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MaterialModule} from './material/material.module';
import {HomeModule} from './forms/home/home.module';
import {SkillModule} from './forms/skill/skill.module';
import {CommonModule} from '@angular/common';
import {ExperienceComponent} from './forms/experience/experience.component';
import {AnimateInModule} from "./animate-in/animate-in.module";
import {ProjectComponent} from './forms/project/project.component';
import {ContactComponent} from './forms/contact/contact.component';

@NgModule({
  declarations: [AppComponent, ExperienceComponent, ProjectComponent, ContactComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    SkillModule,
    MaterialModule,
    AnimateInModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
