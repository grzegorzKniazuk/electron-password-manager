import { MatDialogRef } from '@angular/material';
import { HostListener } from '@angular/core';
import { Generator } from './generator.model';

export abstract class Dialog<T> extends Generator {

  protected constructor(protected matDialogRef: MatDialogRef<T>) {
    super();
  }

  @HostListener('document:keydown.esc')
  private closeDialog(): void {
    this.matDialogRef.close();
  }

  protected generateNewPassword(): string {
    return super.generateNewPassword();
  }
}
