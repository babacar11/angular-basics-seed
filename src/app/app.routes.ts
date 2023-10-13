import { Routes } from '@angular/router';

import { PageNotfoundComponent } from './page-notfound/page-notfound.component';

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((x) => x.AdminModule),
  },
  { path: '', pathMatch: 'full', redirectTo: 'admin' },
  // { path: '404NotFound', component: PageNotfoundComponent },
  { path: '**', component: PageNotfoundComponent },
];
