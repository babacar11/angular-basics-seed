import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
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

@NgModule({
  declarations: [AppComponent, PageNotfoundComponent],
  imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(routes)],
  bootstrap: [AppComponent],
})
export class AppModule {}
