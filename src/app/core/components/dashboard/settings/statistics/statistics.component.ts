import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { Dialog } from '../../../../models/dialog.model';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: [ './statistics.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsComponent extends Dialog<StatisticsComponent> implements OnInit {

  constructor(public dataService: DataService, protected matDialogRef: MatDialogRef<StatisticsComponent>) {
    super(matDialogRef);
  }

  public ngOnInit(): void {
    this.dataService.loadCredentialsCounter();
  }
}
