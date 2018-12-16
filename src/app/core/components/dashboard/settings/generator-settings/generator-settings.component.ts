import {ChangeDetectionStrategy, Component, HostListener, OnInit} from '@angular/core';
import { FormService } from '../../../../services/form.service';
import { MatDialogRef } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { GeneratorSettings } from '../../../../interfaces/generator-settings';
import { Dialog } from '../../../../models/dialog.model';

@Component({
  selector: 'app-generator-settings',
  templateUrl: './generator-settings.component.html',
  styleUrls: ['./generator-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneratorSettingsComponent extends Dialog<GeneratorSettingsComponent> implements OnInit {

  public generatorSettingsForm: FormGroup;
  public generatorFormSettings: GeneratorSettings;
  public readonly symbols = '!@#$%^&*()+_\\-=}{[\\]|:;"/?.><,`~.';

  constructor(private formService: FormService,
              protected matDialogRef: MatDialogRef<GeneratorSettingsComponent>) {
    super(matDialogRef);
  }

  ngOnInit() {
    this.buildForm();
    this.initForm();
  }

  private buildForm(): void {
    this.generatorSettingsForm = this.formService.generatorSettingsForm;
  }

  private initForm(): void {
    if (window.localStorage.getItem('generator-settings')) {
      this.generatorFormSettings = JSON.parse(window.localStorage.getItem('generator-settings'));
      this.generatorSettingsForm.get('length').setValue(this.generatorFormSettings.length);
      this.generatorSettingsForm.get('numbers').setValue(this.generatorFormSettings.numbers);
      this.generatorSettingsForm.get('symbols').setValue(this.generatorFormSettings.symbols);
      this.generatorSettingsForm.get('uppercase').setValue(this.generatorFormSettings.uppercase);
      this.generatorSettingsForm.get('excludeSimilarCharacters').setValue(this.generatorFormSettings.excludeSimilarCharacters);
      this.generatorSettingsForm.get('exclude').setValue(this.generatorFormSettings.exclude);
      this.generatorSettingsForm.get('strict').setValue(this.generatorFormSettings.strict);
    }
  }

  @HostListener('document:keydown.enter')
  public saveSettings(): void {
    window.localStorage.setItem('generator-settings', JSON.stringify(this.generatorSettingsForm.value));
    this.matDialogRef.close('saved');
  }
}
