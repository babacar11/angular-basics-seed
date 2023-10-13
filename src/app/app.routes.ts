import {Routes} from '@angular/router';

import {PageNotfoundComponent} from './page-notfound/page-notfound.component';
import {HttpClientModule} from "@angular/common/http";
import {importProvidersFrom} from "@angular/core";
import {DonutService} from "./admin/service/donut.service";

export const AppRoutes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.routes').then((x) => x.AdminRoutes),
    providers: [importProvidersFrom(HttpClientModule), DonutService]
  },
  { path: '', pathMatch: 'full', redirectTo: 'admin' },
  { path: '**', component: PageNotfoundComponent },
];
