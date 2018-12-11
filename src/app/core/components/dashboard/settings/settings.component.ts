import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormService} from '../../../services/form.service';
import {FormGroup} from '@angular/forms';
import {ToastService} from '../../../services/toast.service';
import {ToastMessages} from '../../../enums/toast-messages.enum';
import {UserSettings} from '../../../interfaces/user-settings';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit {

  public settingsForm: FormGroup;
  public userSettings: UserSettings;

  constructor(private formService: FormService,
              private toastService: ToastService,
              private matDialogRef: MatDialogRef<SettingsComponent>) { }

  ngOnInit() {
    this.buildForm();
    this.initForm();
  }

  private buildForm(): void {
    this.settingsForm = this.formService.settingsForm;
  }

  private initForm(): void {
    if (window.localStorage.getItem('settings')) {
      this.userSettings = JSON.parse(window.localStorage.getItem('settings'));
      this.settingsForm.get('autostart').setValue(this.userSettings.autostart);
      this.settingsForm.get('minimalizeToTray').setValue(this.userSettings.minimalizeToTray);
      this.settingsForm.get('length').setValue(this.userSettings.length);
      this.settingsForm.get('numbers').setValue(this.userSettings.numbers);
      this.settingsForm.get('symbols').setValue(this.userSettings.symbols);
      this.settingsForm.get('uppercase').setValue(this.userSettings.uppercase);
      this.settingsForm.get('excludeSimilarCharacters').setValue(this.userSettings.excludeSimilarCharacters);
      this.settingsForm.get('exclude').setValue(this.userSettings.exclude);
      this.settingsForm.get('strict').setValue(this.userSettings.strict);
    }
  }

  public saveSettings(): void {
    window.localStorage.setItem('settings', JSON.stringify(this.settingsForm.value));
    this.toastService.success(ToastMessages.settingsSaved);
    this.matDialogRef.close();
  }
}
