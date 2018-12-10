import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import { PasswordData } from '../../../../interfaces/password-data';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPasswordComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: PasswordData) {}
}
