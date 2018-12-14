import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Inject,
  OnInit,
  Renderer2,
} from '@angular/core';
import { FormService } from '../../../../services/form.service';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import {ApplicationSettings} from '../../../../interfaces/application-settings';

@Component({
  selector: 'app-application-settings',
  templateUrl: './application-settings.component.html',
  styleUrls: ['./application-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationSettingsComponent implements OnInit {

  public applicationSettingsForm: FormGroup;
  private applicationSettings: ApplicationSettings;

  constructor(private formService: FormService,
              private renderer2: Renderer2,
              private matDialogRef: MatDialogRef<ApplicationSettingsComponent>) { }

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
      this.applicationSettingsForm.get('autostart').setValue(this.applicationSettings.autostart);
      this.applicationSettingsForm.get('minimalizeToTray').setValue(this.applicationSettings.minimalizeToTray);
    }
  }

  @HostListener('document:keydown.enter')
  public saveApplicationSettings(): void {
    window.localStorage.setItem('app-settings', JSON.stringify(this.applicationSettingsForm.value));
    this.matDialogRef.close('saved');
  }

  @HostListener('document:keydown.esc')
  private closeApplicationSettings(): void {
    this.matDialogRef.close();
  }
}
