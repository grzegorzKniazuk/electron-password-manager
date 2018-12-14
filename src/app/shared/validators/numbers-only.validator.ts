import {AbstractControl, ValidationErrors} from '@angular/forms';

export function NumberOnlyValidator(control: AbstractControl): ValidationErrors | null {
  if (isNaN(parseInt(control.value, 10)) || parseInt(control.value, 10).toString() !== control.value.toString()) {
    return ({
      numbersOnly: true,
    });
  }
  return null;
}
