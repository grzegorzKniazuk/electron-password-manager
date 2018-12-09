import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { PasswordListComponent } from './password-list/password-list.component';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AddPasswordComponent } from './password-list/add-password/add-password.component';
import { MaterialModule } from '../../../material.module';
import { PasswordFormComponent } from './password-list/password-form/password-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    PasswordListComponent,
    AddPasswordComponent,
    PasswordFormComponent,
  ],
  entryComponents: [
    AddPasswordComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class DashboardModule { }
