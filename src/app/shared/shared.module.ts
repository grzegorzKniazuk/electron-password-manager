import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FormHeaderComponent } from './components/form-header/form-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    FormHeaderComponent,
  ],
  exports: [
    FormHeaderComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule { }
