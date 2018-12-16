import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Dialog } from '../../../../models/dialog.model';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpComponent extends Dialog<HelpComponent> {

  constructor(protected matDialogRef: MatDialogRef<HelpComponent>) {
    super(matDialogRef);
  }
}
