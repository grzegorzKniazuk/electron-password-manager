import { MatBottomSheetRef } from '@angular/material';

export abstract class Confirm {

  protected constructor(protected matBottomSheetRef: MatBottomSheetRef) {}

  public response(response: string): void {
    this.matBottomSheetRef.dismiss(response);
  }
}
