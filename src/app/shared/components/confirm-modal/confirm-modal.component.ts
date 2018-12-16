import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import {MatBottomSheetRef} from '@angular/material';
import { Confirm } from '../../../core/models/confirm.model';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmModalComponent extends Confirm {

  constructor(protected matBottomSheetRef: MatBottomSheetRef) {
    super(matBottomSheetRef);
  }

  @HostListener('document:keydown.enter')
  private onEnter(): void {
    this.matBottomSheetRef.dismiss('confirm');
  }
}
