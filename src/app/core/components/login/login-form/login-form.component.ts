import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { FormService } from '../../../services/form.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toast.service';

@Component({
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit {

  public authForm: FormGroup;

  constructor(private authService: AuthService,
              private formService: FormService,
              private router: Router,
              private toastService: ToastService) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.authForm = this.formService.authForm;
  }

  public login(): void {
    this.authService.login(this.authForm.value)
    .then(() => this.router.navigate(['/dashboard']))
    .catch((error) => this.toastService.error(error.message));
  }

  public register(): void {
    if (this.authForm.valid) {
      this.authService.register(this.authForm.value)
      .then(() => this.toastService.success('Account created, please log in!'))
      .catch((error) => this.toastService.error(error.message));
    }
  }
}
