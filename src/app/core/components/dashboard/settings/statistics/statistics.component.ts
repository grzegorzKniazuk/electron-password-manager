import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsComponent {

  constructor(public dataService: DataService) { }
}
