import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroComponent } from './core/components/intro/intro.component';
import {UserDataResolve} from './core/resolves/user-data.resolve';

const routes: Routes = [
  {
    path: '',
    component: IntroComponent
  },
  {
    path: 'login',
    loadChildren: './core/components/login/login.module#LoginModule'
  },
  {
    path: 'dashboard',
    loadChildren: './core/components/dashboard/dashboard.module#DashboardModule',
    resolve: {
      userData: UserDataResolve
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // enableTracing: true,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
