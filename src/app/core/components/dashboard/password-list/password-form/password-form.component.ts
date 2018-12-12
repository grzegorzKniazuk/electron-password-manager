import {ChangeDetectionStrategy, Component, HostListener, Input, OnInit} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from '../../../../services/form.service';
import {PasswordData} from '../../../../interfaces/password-data';
import {MatDialogRef} from '@angular/material';
import {GeneratorSettings} from '../../../../interfaces/generator-settings';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordFormComponent implements OnInit {

  @Input() public credentialsData: PasswordData;
  public credentialsForm: FormGroup;
  public passwordInputFocus = false;
  private passwordGeneratorSettings: GeneratorSettings;
  private data: PasswordData[] = JSON.parse(window.localStorage.getItem('data'));

  constructor(private formService: FormService, private matDialogRef: MatDialogRef<PasswordFormComponent>) { }

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

  @HostListener('document:keydown.enter')
  public saveCredentials(): void {
    if (this.credentialsForm.valid) {
      this.data.push({
        id: Date.now(),
        refersTo: this.credentialsForm.get('refersTo').value,
        login: this.credentialsForm.get('login').value,
        password: this.credentialsForm.get('password').value,
      });
      window.localStorage.setItem('data', JSON.stringify(this.data));
      this.matDialogRef.close('ok');
    }
  }

  public updateCredentials(): void {
    if (this.credentialsForm.valid) {
      this.data = this.data.filter((password: PasswordData) => password.id !== this.credentialsData.id);
      this.data.push({
        id: this.credentialsData.id,
        refersTo: this.credentialsForm.get('refersTo').value,
        login: this.credentialsForm.get('login').value,
        password: this.credentialsForm.get('password').value,
      });
      window.localStorage.setItem('data', JSON.stringify(this.data));
      this.matDialogRef.close('ok');
    }
  }

  public generatePassword(): void {
  }
}
