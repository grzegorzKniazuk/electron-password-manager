import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Dialog } from '../../../../models/dialog.model';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-application-info',
  templateUrl: './application-info.component.html',
  styleUrls: ['./application-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationInfoComponent extends Dialog<ApplicationInfoComponent> {

  constructor(protected matDialogRef: MatDialogRef<ApplicationInfoComponent>) {
    super(matDialogRef);
  }
}
