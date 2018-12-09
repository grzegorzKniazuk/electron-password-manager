import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {

  constructor(private formBuilder: FormBuilder) { }

  public get authForm(): FormGroup {
    return this.formBuilder.group({
      email: [ '', [ Validators.required, Validators.email ] ],
      password: [ '', [ Validators.required, Validators.minLength(6) ] ],
    });
  }

  public get credentialsForm(): FormGroup {
    return this.formBuilder.group({
      date: Date.now(),
      refersTo: [ '', Validators.required ],
      login: [ '', Validators.required ],
      password: [ '', Validators.required ],
    });
  }
}
