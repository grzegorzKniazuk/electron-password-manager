import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-intro-title',
  templateUrl: './intro-title.component.html',
  styleUrls: ['./intro-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroTitleComponent {}
