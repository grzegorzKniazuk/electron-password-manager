import { NgModule } from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DEFAULT_OPTIONS,
  MAT_DIALOG_DEFAULT_OPTIONS,
  MAT_SNACK_BAR_DEFAULT_OPTIONS, MAT_TOOLTIP_DEFAULT_OPTIONS, MatBottomSheetConfig, MatBottomSheetModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDialogConfig,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatPaginatorModule,
  MatSnackBarConfig,
  MatSnackBarModule,
  MatTableModule,
  MatToolbarModule, MatTooltipDefaultOptions, MatTooltipModule
} from '@angular/material';

const MAT_DIALOG_GLOBAL_CONFIG: MatDialogConfig = {
  width: '420px',
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

const MAT_TOOLTIP_GLOBAL_CONFIG: MatTooltipDefaultOptions = {
  showDelay: 1000,
  hideDelay: 0,
  touchendHideDelay: 1000,
};

const MAT_BOTTOM_SHEET_GLOBAL_CONFIG: MatBottomSheetConfig = {
  hasBackdrop: true,
  disableClose: true,
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
    MatCheckboxModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatBottomSheetModule,
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
    MatCheckboxModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatBottomSheetModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: MAT_DIALOG_GLOBAL_CONFIG },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: MAT_SNACKBAR_GLOBAL_CONFIG },
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: MAT_TOOLTIP_GLOBAL_CONFIG },
    { provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, useValue: MAT_BOTTOM_SHEET_GLOBAL_CONFIG },
  ]
})
export class MaterialModule { }
