import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-backup-settings',
  templateUrl: './backup-settings.component.html',
  styleUrls: ['./backup-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackupSettingsComponent {}
