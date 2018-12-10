import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'passwordHide',
})
export class PasswordHidePipe implements PipeTransform {

  transform(password: string): string {
    return password.replace(/./g, '\u25CF');
  }

}
