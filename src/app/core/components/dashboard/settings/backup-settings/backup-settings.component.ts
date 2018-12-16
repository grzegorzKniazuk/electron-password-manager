import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { Confirm } from '../../../../models/confirm.model';
import { DataService } from '../../../../services/data.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HtmlInputEvent } from '../../../../interfaces/html-input-event';

@Component({
  selector: 'app-backup-settings',
  templateUrl: './backup-settings.component.html',
  styleUrls: ['./backup-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackupSettingsComponent extends Confirm implements OnInit {

  private date = new Date().toLocaleString('PL');
  private reader: FileReader = new FileReader();
  public backupLink: SafeUrl;
  public fileName: string;

  constructor(protected matBottomSheetRef: MatBottomSheetRef,
              private domSanitizer: DomSanitizer,
              private dataService: DataService) {
    super(matBottomSheetRef);
  }

  public ngOnInit(): void {
    this.initBackupJSON();
  }

  private setFileName(): void {
    this.date = this.date.split(',')[0].replace(/\./g, '');
    this.fileName = `SPMbackup${this.date}.json`;
  }

  private initBackupJSON(): void {
    this.setFileName();
    const theJSON = JSON.stringify(this.dataService.passwordData);
    this.backupLink = this.domSanitizer.bypassSecurityTrustUrl('data:text/json;charset=UTF-8,' + encodeURIComponent(theJSON));
  }

  public restoreData(event: HtmlInputEvent): void {

    this.reader.readAsText(event.target.files[0]);

    this.reader.onload = () => {
      localStorage.setItem('data', JSON.stringify(JSON.parse(<string>this.reader.result)));
      this.matBottomSheetRef.dismiss('restore');
    };
  }
}
