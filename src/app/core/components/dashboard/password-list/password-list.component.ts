import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddPasswordComponent } from './add-password/add-password.component';
import { ToastService } from '../../../services/toast.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordListComponent {

  constructor(private matDialog: MatDialog,
              private toastService: ToastService,
              private authService: AuthService,
              private router: Router) { }

  public openNewPasswordModal(): void {
    this.matDialog.open(AddPasswordComponent);
  }

  public logout(): void {
    this.authService.logout().then(() => {
      this.router.navigate(['login']);
    }).catch((error) => {
      this.toastService.error(error);
    });
  }
}
