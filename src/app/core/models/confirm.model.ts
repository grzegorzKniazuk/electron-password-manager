import { MatBottomSheetRef } from '@angular/material';
import { HostListener } from '@angular/core';

export abstract class Confirm {

  protected constructor(protected matBottomSheetRef: MatBottomSheetRef) {}

  public response(response: string): void {
    this.matBottomSheetRef.dismiss(response);
  }

  @HostListener('document:keydown.esc')
  private close(): void {
    this.matBottomSheetRef.dismiss();
  }
}
