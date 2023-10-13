import {enableProdMode, importProvidersFrom} from '@angular/core';

import {bootstrapApplication} from '@angular/platform-browser'

import {environment} from './environments/environment';
import {AppComponent} from "./app/app.component";
import {RouterModule} from "@angular/router";
import {AppRoutes} from "./app/app.routes";

if (environment.production) {
  enableProdMode();
}


bootstrapApplication(AppComponent,{
  providers: [ importProvidersFrom(RouterModule.forRoot(AppRoutes)) ]
}).catch(err=> console.log(err))
