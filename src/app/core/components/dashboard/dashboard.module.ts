import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { PasswordListComponent } from './password-list/password-list.component';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AddPasswordComponent } from './password-list/add-password/add-password.component';
import { MaterialModule } from '../../../material.module';
import { PasswordFormComponent } from './password-list/password-form/password-form.component';
import { SharedModule } from '../../../shared/shared.module';
import { EditPasswordComponent } from './password-list/edit-password/edit-password.component';
import { ApplicationSettingsComponent } from './settings/application-settings/application-settings.component';
import { GeneratorSettingsComponent } from './settings/generator-settings/generator-settings.component';
import { BackupSettingsComponent } from './settings/backup-settings/backup-settings.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PasswordListComponent,
    AddPasswordComponent,
    PasswordFormComponent,
    EditPasswordComponent,
    ApplicationSettingsComponent,
    GeneratorSettingsComponent,
    BackupSettingsComponent,
  ],
  entryComponents: [
    AddPasswordComponent,
    EditPasswordComponent,
    ApplicationSettingsComponent,
    GeneratorSettingsComponent,
    BackupSettingsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
    MaterialModule,
    SharedModule,
  ],
})
export class DashboardModule { }
