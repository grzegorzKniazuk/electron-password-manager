import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet, MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AddPasswordComponent } from './add-password/add-password.component';
import { PasswordData } from '../../../interfaces/password-data';
import { EditPasswordComponent } from './edit-password/edit-password.component';
import { ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';
import { ToastService } from '../../../services/toast.service';
import { ToastMessages } from '../../../enums/toast-messages.enum';
import { ApplicationSettingsComponent } from '../settings/application-settings/application-settings.component';
import { GeneratorSettingsComponent } from '../settings/generator-settings/generator-settings.component';
import { BackupSettingsComponent } from '../settings/backup-settings/backup-settings.component';
import { ApplicationInfoComponent } from '../settings/application-info/application-info.component';
import { Generator } from '../../../models/generator.model';
import { HelpComponent } from '../settings/help/help.component';
import { ApplicationSettings } from '../../../interfaces/application-settings';
import { StatisticsComponent } from '../settings/statistics/statistics.component';
import { VersionInfoComponent } from '../settings/version-info/version-info.component';
import { DataService } from '../../../services/data.service';
import { AppInformations } from '../../../interfaces/app-informations';

@Component({
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordListComponent extends Generator implements OnInit, AfterContentInit {

  @ViewChild(MatPaginator) private paginator: MatPaginator;
  @ViewChild(MatSort) private sort: MatSort;

  private readonly defaultInfo: AppInformations = {
    version: '1.0.0',
    credentialsCount: 0,
    passwordGenerated: 0,
  };

  public data: PasswordData[] = [];
  public dataSource: MatTableDataSource<PasswordData>;
  public readonly columnList: string[] = [ 'date', 'website', 'login', 'password', 'actions' ];
  public passwordId: number;
  private randomGeneratedPassword: string;
  private applicationSettings: ApplicationSettings;
  private pageSize: number;

  constructor(private matDialog: MatDialog,
              private dataService: DataService,
              private matBottomSheet: MatBottomSheet,
              private toastService: ToastService,
              private changeDetectorRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.checkAppVersion();
    this.initSettings();
    this.initData();
    this.initPagination();
    this.initSort();
  }

  public ngAfterContentInit(): void {
    this.welcome();
  }

  private welcome(): void {
    setTimeout(() => {
      this.toastService.success(ToastMessages.welcomeBack);
    });
  }

  private initSettings(): void {
    this.applicationSettings = JSON.parse(window.localStorage.getItem('app-settings'));
    if (!this.applicationSettings) {
      this.pageSize = 8;
    } else {
      this.pageSize = this.applicationSettings.pageSize;
    }
  }

  private initData(): void {
    this.data = JSON.parse(window.localStorage.getItem('data'));
    this.dataSource = new MatTableDataSource<PasswordData>(this.data);
    this.initSort();
    this.initPagination();
    this.changeDetectorRef.detectChanges();
  }

  private initSort(): void {
    this.dataSource.sort = this.sort;
  }

  private initPagination(): void {
    this.dataSource.paginator = this.paginator;
  }

  public openNewPasswordModal(): void {
    this.matDialog.open(AddPasswordComponent).afterClosed().subscribe((response: string) => {
      if (response === 'ok') {
        this.initData();
        this.toastService.success(ToastMessages.credentialsSaved);
      }
    });
  }

  public openApplicationSettingsModal(): void {
    this.matDialog.open(ApplicationSettingsComponent, {
      width: '450px',
    }).afterClosed().subscribe((response: string) => {
      if (response === 'saved') {
        this.toastService.success(ToastMessages.settingsSaved);
      }
      this.initSettings();
      this.changeDetectorRef.detectChanges();
    });
  }

  public openApplicationInfoModal(): void {
    this.matDialog.open(ApplicationInfoComponent, {
      width: '400px',
    });
  }

  public openGeneratorSettingsModal(): void {
    this.matDialog.open(GeneratorSettingsComponent, {
      width: '550px',
    }).afterClosed().subscribe((response: string) => {
      if (response === 'saved') {
        this.toastService.success(ToastMessages.settingsSaved);
      }
    });
  }

  public openBackupSettingsModal(): void {
    this.matDialog.open(BackupSettingsComponent, {
      width: '500px',
    });
  }

  public openEditModal(element: PasswordData): void {
    this.matDialog.open(EditPasswordComponent, {
      data: element,
    }).afterClosed().subscribe((response: string) => {
      if (response === 'saved') {
        this.initData();
        this.toastService.success(ToastMessages.credentialsUpdated);
      }
    });
  }

  public openConfirmDeleteModal(element: PasswordData): void {
    this.matBottomSheet.open(ConfirmModalComponent).afterDismissed().subscribe((response: string) => {
      if (response === 'confirm') {
        this.data = this.data.filter((password: PasswordData) => password.id !== element.id);
        window.localStorage.setItem('data', JSON.stringify(this.data));
        this.initData();
        this.toastService.success(ToastMessages.credentialsDeleted);
      }
    });
  }

  public openHelpModal(): void {
    this.matDialog.open(HelpComponent, {
      width: '500px',
    });
  }

  public openStatisticsModal(): void {
    this.matDialog.open(StatisticsComponent, {
      width: '300px',
    });
  }

  public openUpdatesModal(): void {
    this.matDialog.open(VersionInfoComponent, {
      width: '400px',
    });
  }

  public applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public showPassword(element: PasswordData): void {
    this.passwordId = element.id;
  }

  public copyPassword(password: string, random: boolean): void {
    const textArea = document.createElement('textarea');
    textArea.value = password;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
    if (random) {
      this.toastService.successWithComponent(`The random password ${password} has been successfully copied to the clipboard`);
    } else {
      this.toastService.success(ToastMessages.successfullyCopied);
    }
  }

  public generateAndCopyRandomPassword(): void {
    this.randomGeneratedPassword = super.generateNewPassword();
    this.copyPassword(this.randomGeneratedPassword, true);
  }

  private checkAppVersion(): void {
    console.log(JSON.parse(localStorage.getItem('app-info')));
    if (!JSON.parse(localStorage.getItem('app-info'))) {
      localStorage.setItem('app-info', JSON.stringify(this.defaultInfo));
    }
    this.dataService.appInformations$.next(JSON.parse(localStorage.getItem('app-info')));
  }
}
