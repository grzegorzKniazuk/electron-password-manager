import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FormHeaderComponent } from './components/form-header/form-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsernamePipe } from './pipes/username.pipe';
import { PasswordHidePipe } from './pipes/password-hide.pipe';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    FormHeaderComponent,
    UsernamePipe,
    PasswordHidePipe,
    ConfirmModalComponent,
  ],
  entryComponents: [
    ConfirmModalComponent,
  ],
  exports: [
    FormHeaderComponent,
    FormsModule,
    ReactiveFormsModule,
    UsernamePipe,
    PasswordHidePipe,
    ConfirmModalComponent,
  ],
})
export class SharedModule { }
