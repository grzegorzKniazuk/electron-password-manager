import { NgModule } from '@angular/core';
import { MAT_DIALOG_DEFAULT_OPTIONS, MAT_SNACK_BAR_DEFAULT_OPTIONS, MatButtonModule, MatDialogConfig, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSnackBarConfig, MatSnackBarModule, MatTableModule, MatToolbarModule } from '@angular/material';

const MAT_DIALOG_GLOBAL_CONFIG: MatDialogConfig = {
  width: '400px',
  disableClose: true,
  hasBackdrop: true,
  autoFocus: true,
  restoreFocus: true,
};

const MAT_SNACKBAR_GLOBAL_CONFIG: MatSnackBarConfig = {
  duration: 2500,
  verticalPosition: 'bottom',
  horizontalPosition: 'center',
};

@NgModule({
  declarations: [],
  imports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTableModule,
    MatToolbarModule,
  ],
  exports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTableModule,
    MatToolbarModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: MAT_DIALOG_GLOBAL_CONFIG },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: MAT_SNACKBAR_GLOBAL_CONFIG },
  ]
})
export class MaterialModule { }
