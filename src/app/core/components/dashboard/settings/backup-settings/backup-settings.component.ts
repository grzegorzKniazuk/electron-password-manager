import {ChangeDetectionStrategy, Component} from '@angular/core';
import { Dialog } from '../../../../models/dialog.model';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-backup-settings',
  templateUrl: './backup-settings.component.html',
  styleUrls: ['./backup-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackupSettingsComponent extends Dialog<BackupSettingsComponent> {

  constructor(protected matDialogRef: MatDialogRef<BackupSettingsComponent>) {
    super(matDialogRef);
  }
}
