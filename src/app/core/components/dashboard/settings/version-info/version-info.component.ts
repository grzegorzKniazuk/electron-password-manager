import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { MatDialogRef } from '@angular/material';
import { Dialog } from '../../../../models/dialog.model';

@Component({
  selector: 'app-version-info',
  templateUrl: './version-info.component.html',
  styleUrls: [ './version-info.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VersionInfoComponent extends Dialog<VersionInfoComponent> {

  constructor(public dataService: DataService, protected matDialogRef: MatDialogRef<VersionInfoComponent>) {
    super(matDialogRef);
  }
}
