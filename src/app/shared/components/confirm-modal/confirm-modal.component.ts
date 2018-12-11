import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatBottomSheetRef} from '@angular/material';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmModalComponent {

  constructor(private matBottomSheetRef: MatBottomSheetRef) {}

  public response(response: string): void {
    this.matBottomSheetRef.dismiss(response);
  }
}
