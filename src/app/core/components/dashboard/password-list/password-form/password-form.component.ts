import {ChangeDetectionStrategy, Component, HostListener, Input, OnInit} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from '../../../../services/form.service';
import {PasswordData} from '../../../../interfaces/password-data';
import {MatDialogRef} from '@angular/material';
import {Generator} from '../../../../models/generator.model';
import {ToastService} from '../../../../services/toast.service';
import { ToastMessages } from '../../../../enums/toast-messages.enum';
import { ApplicationSettings } from '../../../../interfaces/application-settings';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordFormComponent extends Generator implements OnInit {

  @Input() public credentialsData: PasswordData;
  public credentialsForm: FormGroup;
  public passwordInputFocus = false;
  private password: string;
  private data: PasswordData[] = JSON.parse(window.localStorage.getItem('data'));
  public isPasswordWasGenerated: boolean;
  private previousGeneratedPassword: string;
  private applicationSettings: ApplicationSettings;

  constructor(private formService: FormService,
              private toastService: ToastService,
              private matDialogRef: MatDialogRef<PasswordFormComponent>) {
    super();
  }

  ngOnInit() {
    this.initForm();
    this.initSettings();
    this.isEditMode();
  }

  public initForm(): void {
    this.credentialsForm = this.formService.credentialsForm;
  }

  private initSettings(): void {
    this.applicationSettings = JSON.parse(localStorage.getItem('app-settings'));
  }

  private isEditMode(): void {
    if (this.credentialsData) {
      this.credentialsForm.get('refersTo').setValue(this.credentialsData.refersTo);
      this.credentialsForm.get('login').setValue(this.credentialsData.login);
      this.credentialsForm.get('password').setValue(this.credentialsData.password);
      this.previousGeneratedPassword = this.credentialsData.password;
    }
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

  @HostListener('document:keydown.enter')
  public updateCredentials(): void {
    if (this.credentialsData && this.credentialsForm.valid) {
      this.data = this.data.filter((password: PasswordData) => password.id !== this.credentialsData.id);
      this.data.push({
        id: this.credentialsData.id,
        refersTo: this.credentialsForm.get('refersTo').value,
        login: this.credentialsForm.get('login').value,
        password: this.credentialsForm.get('password').value,
      });
      window.localStorage.setItem('data', JSON.stringify(this.data));
      this.matDialogRef.close('saved');
    }
  }

  @HostListener('document:keydown.esc')
  private closeDialog(): void {
    this.matDialogRef.close();
  }

  public generatePassword(): void {
    this.password = super.generateNewPassword();
    this.previousGeneratedPassword = this.credentialsForm.get('password').value;
    this.credentialsForm.get('password').setValue(this.password);
    this.credentialsForm.get('password').markAsDirty();
    if (this.applicationSettings && this.applicationSettings.showGeneratedPassword) {
      this.toastService.success(`The password generated is ${this.password}`);
    }
    this.isPasswordWasGenerated = true;
  }

  public restorePreviousPassword(): void {
    this.credentialsForm.get('password').setValue(this.previousGeneratedPassword);
    this.toastService.success(ToastMessages.successfullyRestored);
    this.isPasswordWasGenerated = false;
  }
}
