import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgChartsModule } from 'ng2-charts';
import { ResponseBarComponent } from './response-bar/response-bar.component';
import { CombinedApiComponent } from './combined-api/combined-api.component';


const routes: Routes = [
  { path: 'responsejson', component: ResponseBarComponent },
  { path: 'combinedapijson', component: CombinedApiComponent },
  
];

@NgModule({
  declarations: [
    AppComponent,
    ResponseBarComponent,
    CombinedApiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgChartsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
