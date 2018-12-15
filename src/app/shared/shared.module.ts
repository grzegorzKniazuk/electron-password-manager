import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FormHeaderComponent } from './components/form-header/form-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordHidePipe } from './pipes/password-hide.pipe';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    FormHeaderComponent,
    PasswordHidePipe,
    ConfirmModalComponent,
    SnackBarComponent,
  ],
  entryComponents: [
    ConfirmModalComponent,
    SnackBarComponent,
  ],
  exports: [
    FormHeaderComponent,
    FormsModule,
    ReactiveFormsModule,
    PasswordHidePipe,
    ConfirmModalComponent,
    SnackBarComponent,
  ],
})
export class SharedModule { }
