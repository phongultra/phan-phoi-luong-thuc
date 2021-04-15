import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps'
import { AgmCoreModule } from '@agm/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavComponent } from './include/nav/nav.component';
import { HomeComponent } from './page/home/home.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { FooterComponent } from './include/footer/footer.component';

import { HttpClientModule } from '@angular/common/http';
import { HomeCreateComponent } from './components/home-create/home-create.component';
import { HomeDetailComponent } from './components/home-detail/home-detail.component';
import { HomeListComponent } from './components/home-list/home-list.component';

import { ChartsModule } from 'ng2-charts';

import { AgGridModule } from 'ag-grid-angular';

import { DatePipe } from '@angular/common';






@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    NotFoundComponent,
    FooterComponent,
    HomeCreateComponent,
    HomeDetailComponent,
    HomeListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    ChartsModule,
    AgGridModule.withComponents([]),
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyAvR9_B8ymX8YELstOmxx5pgP4LTY9maZw'
    })
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
