import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { EventListModule } from './event-list/event-list.module';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from 'src/app/material.module';
import { AppComponent } from './app.component';
import { EventDetailComponent } from './event-list/event-detail/event-detail.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    EventListModule,
    HttpClientModule,
    MaterialModule
  ],
  entryComponents: [
    EventDetailComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
