import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {MaterialModule} from './material/material.module';
import {HomeModule} from './forms/home/home.module';
import {SkillModule} from './forms/skill/skill.module';
import {CommonModule} from '@angular/common';
import {ExperienceComponent} from './forms/experience/experience.component';
import {AnimateInModule} from './animate-in/animate-in.module';
import {ProjectComponent} from './forms/project/project.component';
import {ContactComponent} from './forms/contact/contact.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {HeaderComponent} from './components/header/header.component';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [AppComponent, ExperienceComponent, ProjectComponent, ContactComponent, HeaderComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    SkillModule,
    MaterialModule,
    AnimateInModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
