import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { FormService } from '../../../services/form.service';
import { ToastMessages } from '../../../enums/toast-messages.enum';
import { ToastService } from '../../../services/toast.service';

@Component({
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit {

  public authForm: FormGroup;

  constructor(private authService: AuthService, private formService: FormService, private toastService: ToastService) { }

  ngOnInit() {
    this.buildForm();
    this.isFirstUse();
  }

  private buildForm(): void {
    this.authForm = this.formService.authForm;
  }

  public login(): void {
    this.authService.login(this.authForm.get('password').value);
  }

  public isFirstUse(): void {
    if (!JSON.parse(localStorage.getItem('app-settings'))) {
      this.toastService.success30000(ToastMessages.appInit);
    }
  }
}
