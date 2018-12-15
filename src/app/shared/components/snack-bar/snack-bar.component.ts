import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackBarComponent implements OnInit {

  public password: string;
  public messageElements: string[];
  constructor(@Inject(MAT_SNACK_BAR_DATA) public message: string) { }

  public ngOnInit(): void {
    this.transformMessage();
  }

  private transformMessage(): void {
    this.password = this.message.match(/password\s.+(?=\shas)/)[0];
    this.password = this.password.split(' ')[1];
    this.messageElements = this.message.split(this.password);
  }
}
