import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';
import { ToastMessages } from '../enums/toast-messages.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private router: Router, private toastService: ToastService) {
  }

  public login(password: string): void {
    if (!window.localStorage.getItem('password')) {
      this.register(password);
    } else {
      if (password === window.localStorage.getItem('password')) {
        this.router.navigate(['/dashboard']);
        this.toastService.success(ToastMessages.welcomeBack);
      } else {
        this.toastService.error(ToastMessages.incorrectPassword);
      }
    }
  }

  public register(password: string): void {
    window.localStorage.setItem('password', password);
    this.router.navigate(['/dashboard']);
    window.localStorage.setItem('data', JSON.stringify([]));
    this.toastService.success(ToastMessages.accountCreated);
  }
}
