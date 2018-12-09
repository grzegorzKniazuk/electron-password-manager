import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { PasswordListComponent } from './password-list/password-list.component';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [
    DashboardComponent,
    PasswordListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
  ],
})
export class DashboardModule { }
