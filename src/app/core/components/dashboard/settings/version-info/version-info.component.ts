import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-version-info',
  templateUrl: './version-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VersionInfoComponent {

  constructor(public dataService: DataService) { }
}
