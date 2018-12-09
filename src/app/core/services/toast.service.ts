import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  constructor(private matSnackBar: MatSnackBar) { }

  public success(message: string): void {
    this.matSnackBar.open(message, '', { panelClass: 'toast-success' });
  }

  public error(message: string): void {
    this.matSnackBar.open(message, '', { panelClass: 'toast-error' });
  }
}
