import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {}
