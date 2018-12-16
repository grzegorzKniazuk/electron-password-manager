import {ChangeDetectionStrategy, Component} from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { Confirm } from '../../../../models/confirm.model';

@Component({
  selector: 'app-backup-settings',
  templateUrl: './backup-settings.component.html',
  styleUrls: ['./backup-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackupSettingsComponent extends Confirm {

  constructor(protected matBottomSheetRef: MatBottomSheetRef) {
    super(matBottomSheetRef);
  }
}
