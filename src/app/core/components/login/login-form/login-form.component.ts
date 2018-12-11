import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { FormService } from '../../../services/form.service';

@Component({
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit {

  public authForm: FormGroup;

  constructor(private authService: AuthService, private formService: FormService) { }

  ngOnInit() {
    this.authForm = this.formService.authForm;
  }

  public login(): void {
    this.authService.login(this.authForm.get('password').value);
  }
}
