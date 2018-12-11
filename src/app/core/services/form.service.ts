import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  public get settingsForm(): FormGroup {
    return this.formBuilder.group({
      autostart: [ false ],
      minimalizeToTray: [ false ],
      saveToFirebase: [ false ],
      passwordLength: [ 10 ],
      passwordUppercaseChars: [ false ],
      passwordDigitChars: [ false ],
      passwordSpecialChars: [ false ],
    });
  }
}
