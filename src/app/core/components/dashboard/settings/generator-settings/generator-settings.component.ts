import {ChangeDetectionStrategy, Component, HostListener, OnInit} from '@angular/core';
import { FormService } from '../../../../services/form.service';
import { MatDialogRef } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { GeneratorSettings } from '../../../../interfaces/generator-settings';

@Component({
  selector: 'app-generator-settings',
  templateUrl: './generator-settings.component.html',
  styleUrls: ['./generator-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneratorSettingsComponent implements OnInit {

  public generatorSettingsForm: FormGroup;
  public generatorSettings: GeneratorSettings;
  public readonly symbols = '!@#$%^&*()+_\\-=}{[\\]|:;"/?.><,`~.';

  constructor(private formService: FormService,
              private matDialogRef: MatDialogRef<GeneratorSettingsComponent>) { }

  ngOnInit() {
    this.buildForm();
    this.initForm();
  }

  private buildForm(): void {
    this.generatorSettingsForm = this.formService.generatorSettingsForm;
  }

  private initForm(): void {
    if (window.localStorage.getItem('generator-settings')) {
      this.generatorSettings = JSON.parse(window.localStorage.getItem('generator-settings'));
      this.generatorSettingsForm.get('length').setValue(this.generatorSettings.length);
      this.generatorSettingsForm.get('numbers').setValue(this.generatorSettings.numbers);
      this.generatorSettingsForm.get('symbols').setValue(this.generatorSettings.symbols);
      this.generatorSettingsForm.get('uppercase').setValue(this.generatorSettings.uppercase);
      this.generatorSettingsForm.get('excludeSimilarCharacters').setValue(this.generatorSettings.excludeSimilarCharacters);
      this.generatorSettingsForm.get('exclude').setValue(this.generatorSettings.exclude);
      this.generatorSettingsForm.get('strict').setValue(this.generatorSettings.strict);
    }
  }

  @HostListener('document:keydown.enter')
  public saveSettings(): void {
    window.localStorage.setItem('generator-settings', JSON.stringify(this.generatorSettingsForm.value));
    this.matDialogRef.close('saved');
  }

  @HostListener('document:keydown.esc')
  public closeGeneratorSettings(): void {
    this.matDialogRef.close();
  }
}
