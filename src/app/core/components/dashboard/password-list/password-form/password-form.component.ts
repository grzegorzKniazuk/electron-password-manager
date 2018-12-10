import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from '../../../../services/form.service';
import {PasswordData} from '../../../../interfaces/password-data';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordFormComponent implements OnInit {

  @Input() public credentialsData: PasswordData;
  public credentialsForm: FormGroup;

  constructor(private formService: FormService) { }

  ngOnInit() {
    this.initForm();
    if (this.credentialsData) {
      this.credentialsForm.get('refersTo').setValue(this.credentialsData.refersTo);
      this.credentialsForm.get('login').setValue(this.credentialsData.login);
      this.credentialsForm.get('password').setValue(this.credentialsData.password);
    }
  }

  public initForm(): void {
    this.credentialsForm = this.formService.credentialsForm;
  }

  public saveCredentials(): void {
    if (this.credentialsForm.valid) {

    }
  }

  public updateCredentials(): void {
    if (this.credentialsForm.valid) {

    }
  }
}
