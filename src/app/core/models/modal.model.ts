import { Generator } from './generator.model';
import { GeneratorSettingsComponent } from '../components/dashboard/settings/generator-settings/generator-settings.component';
import { ToastMessages } from '../enums/toast-messages.enum';
import { MatBottomSheet, MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ToastService } from '../services/toast.service';
import { StatisticsComponent } from '../components/dashboard/settings/statistics/statistics.component';
import { BackupSettingsComponent } from '../components/dashboard/settings/backup-settings/backup-settings.component';
import { VersionInfoComponent } from '../components/dashboard/settings/version-info/version-info.component';
import { HelpComponent } from '../components/dashboard/settings/help/help.component';
import { ApplicationInfoComponent } from '../components/dashboard/settings/application-info/application-info.component';
import { ApplicationSettingsComponent } from '../components/dashboard/settings/application-settings/application-settings.component';
import { ApplicationSettings } from '../interfaces/application-settings';
import { ChangeDetectorRef, HostListener, ViewChild } from '@angular/core';
import { PasswordData } from '../interfaces/password-data';
import { EditPasswordComponent } from '../components/dashboard/password-list/edit-password/edit-password.component';
import { AddPasswordComponent } from '../components/dashboard/password-list/add-password/add-password.component';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal/confirm-modal.component';

export abstract class Modal extends Generator {

  @ViewChild(MatPaginator) private paginator: MatPaginator;
  @ViewChild(MatSort) private sort: MatSort;
  protected applicationSettings: ApplicationSettings;
  protected pageSize: number;
  public data: PasswordData[] = [];
  public dataSource: MatTableDataSource<PasswordData>;
  protected constructor(protected matDialog: MatDialog,
                        protected toastService: ToastService,
                        protected changeDetectorRef: ChangeDetectorRef,
                        protected matBottomSheet: MatBottomSheet) {
    super();
  }

  protected initSettings(): void {
    this.applicationSettings = JSON.parse(window.localStorage.getItem('app-settings'));
    if (!this.applicationSettings) {
      this.pageSize = 8;
    } else {
      this.pageSize = this.applicationSettings.pageSize;
    }
  }

  protected initData(): void {
    this.data = JSON.parse(window.localStorage.getItem('data'));
    this.dataSource = new MatTableDataSource<PasswordData>(this.data);
    this.initSort();
    this.initPagination();
    this.changeDetectorRef.detectChanges();
  }

  protected initSort(): void {
    this.dataSource.sort = this.sort;
  }

  protected initPagination(): void {
    this.dataSource.paginator = this.paginator;
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

  public openStatisticsModal(): void {
    this.matDialog.open(StatisticsComponent, {
      width: '300px',
    });
  }

  public openBackupSettingsModal(): void {
    this.matBottomSheet.open(BackupSettingsComponent, {
      disableClose: false,
    }).afterDismissed().subscribe((response: string) => {
      if (response === 'backup') {

      } else if (response === 'restore') {
        this.toastService.success(ToastMessages.restore);
        this.initData();
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  public openUpdatesModal(): void {
    this.matDialog.open(VersionInfoComponent, {
      width: '350px',
    });
  }

  public openHelpModal(): void {
    this.matDialog.open(HelpComponent, {
      width: '500px',
    });
  }

  public openApplicationInfoModal(): void {
    this.matDialog.open(ApplicationInfoComponent, {
      width: '400px',
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

  public openNewPasswordModal(): void {
    this.matDialog.open(AddPasswordComponent).afterClosed().subscribe((response: string) => {
      if (response === 'ok') {
        this.initData();
        this.toastService.success(ToastMessages.credentialsSaved);
      }
    });
  }

  @HostListener('document:keypress', ['$event'])
  private listenKeyCodes(event: KeyboardEvent): void {
    if (event.code === 'NumpadAdd') {
      this.openNewPasswordModal();
    }
  }
}
