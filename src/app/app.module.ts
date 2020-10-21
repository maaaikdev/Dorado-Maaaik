import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ServiceComponent } from './pages/service/service.component';
import { WorkerComponent } from './pages/worker/worker.component';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { getBaseLocation } from './shared/common-functions.util';
import { SafePipe } from './pipes/safe.pipe';
import { GoogleMapsModule } from '@angular/google-maps'

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    ContactComponent,
    ServiceComponent,
    WorkerComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    RouterModule ,
    GoogleMapsModule
    
  ],
  providers: [
    // {
    //   provide: APP_BASE_HREF,
    //   useFactory:()=>{
    //       return getBaseLocation();
    //   } 
    // }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
