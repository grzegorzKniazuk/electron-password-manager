import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { FormService } from '../../../../services/form.service';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ApplicationSettings } from '../../../../interfaces/application-settings';
import { Dialog } from '../../../../models/dialog.model';

@Component({
  selector: 'app-application-settings',
  templateUrl: './application-settings.component.html',
  styleUrls: ['./application-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationSettingsComponent extends Dialog<ApplicationSettingsComponent> implements OnInit {

  public applicationSettingsForm: FormGroup;
  private applicationSettings: ApplicationSettings;
  public readonly pageSizeOptions: number[] = [ 2, 4, 8, 16, 24, 32 ];

  constructor(private formService: FormService,
              protected matDialogRef: MatDialogRef<ApplicationSettingsComponent>) {
    super(matDialogRef);
  }

  ngOnInit() {
    this.buildForm();
    this.initForm();
  }

  private buildForm(): void {
    this.applicationSettingsForm = this.formService.applicationSettingsForm;
  }

  private initForm(): void {
    if (window.localStorage.getItem('app-settings')) {
      this.applicationSettings = JSON.parse(window.localStorage.getItem('app-settings'));
      this.applicationSettingsForm.get('pageSize').setValue(this.applicationSettings.pageSize);
      this.applicationSettingsForm.get('autostart').setValue(this.applicationSettings.autostart);
      this.applicationSettingsForm.get('minimizeToTray').setValue(this.applicationSettings.minimizeToTray);
      this.applicationSettingsForm.get('autoLogin').setValue(this.applicationSettings.autoLogin);
      this.applicationSettingsForm.get('showGeneratedPassword').setValue(this.applicationSettings.showGeneratedPassword);
    } else {
      this.applicationSettingsForm.get('pageSize').setValue(8);
    }
  }

  @HostListener('document:keydown.enter')
  public saveApplicationSettings(): void {
    window.localStorage.setItem('app-settings', JSON.stringify(this.applicationSettingsForm.value));
    this.matDialogRef.close('saved');
  }
}
