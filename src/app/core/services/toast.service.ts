import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SnackBarComponent } from '../../shared/components/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  constructor(private matSnackBar: MatSnackBar) { }

  public success(message: string): void {
    this.matSnackBar.open(message, '', {
      panelClass: 'toast-success'
    });
  }

  public successWithComponent(message: string): void {
    this.matSnackBar.openFromComponent(SnackBarComponent, {
      panelClass: 'toast-success',
      data: message,
    });
  }

  public success30000(message: string): void {
    this.matSnackBar.open(message, '', {
      panelClass: 'toast-success',
      duration: 30000,
    });
  }

  public error(message: string): void {
    this.matSnackBar.open(message, '', {
      panelClass: 'toast-error'
    });
  }
}
