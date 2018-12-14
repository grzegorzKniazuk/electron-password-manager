import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NumberOnlyValidator } from '../../shared/validators/numbers-only.validator';

@Injectable({
  providedIn: 'root',
})
export class FormService {

  constructor(private formBuilder: FormBuilder) { }

  public get authForm(): FormGroup {
    return this.formBuilder.group({
      password: [ '', [ Validators.required ] ],
    });
  }

  public get credentialsForm(): FormGroup {
    return this.formBuilder.group({
      id: Date.now(),
      refersTo: [ '', Validators.required ],
      login: [ '', Validators.required ],
      password: [ '', Validators.required ],
    });
  }

  public get applicationSettingsForm(): FormGroup {
    return this.formBuilder.group({
      autostart: [ false ],
      minimalizeToTray: [ false ],
      autoLogin: [ false ],
    });
  }

  public get generatorSettingsForm(): FormGroup {
    return this.formBuilder.group({
      length: [ 10, [ Validators.required, Validators.min(1), NumberOnlyValidator ] ],
      numbers: [ false ],
      symbols: [ false ],
      uppercase: [ false ],
      excludeSimilarCharacters: [ false ],
      exclude: [ '' ],
      strict: [ false ],
    });
  }
}
