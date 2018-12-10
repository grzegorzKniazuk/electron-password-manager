import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-add-password',
  templateUrl: './add-password.component.html',
  styleUrls: ['./add-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPasswordComponent {}
