import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormService} from '../../../services/form.service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit {

  public settingsForm: FormGroup;

  constructor(private formService: FormService) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm(): void {
    this.settingsForm = this.formService.settingsForm;
  }

  public saveSettings(): void {

  }
}
