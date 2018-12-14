import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-application-info',
  templateUrl: './application-info.component.html',
  styleUrls: ['./application-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationInfoComponent {}
