import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatBottomSheet, MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AddPasswordComponent} from './add-password/add-password.component';
import {SettingsComponent} from '../settings/settings.component';
import {PasswordData} from '../../../interfaces/password-data';
import {EditPasswordComponent} from './edit-password/edit-password.component';
import {ConfirmModalComponent} from '../../../../shared/components/confirm-modal/confirm-modal.component';
import {ToastService} from '../../../services/toast.service';
import {ToastMessages} from '../../../enums/toast-messages.enum';

@Component({
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordListComponent implements OnInit {

  @ViewChild(MatPaginator) private paginator: MatPaginator;
  @ViewChild(MatSort) private sort: MatSort;
  public data: PasswordData[] = [];
  public dataSource: MatTableDataSource<PasswordData>;
  public readonly columnList: string[] = [ 'website', 'login', 'password', 'actions' ];
  public passwordId: number;

  constructor(private matDialog: MatDialog,
              private matBottomSheet: MatBottomSheet,
              private toastService: ToastService,
              private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.initData();
    this.initPagination();
    this.initSort();
  }

  private initData(): void {
    this.data = JSON.parse(window.localStorage.getItem('data'));
    this.dataSource = new MatTableDataSource<PasswordData>(this.data);
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

  public openSettingsModal(): void {
    this.matDialog.open(SettingsComponent, {
      width: '480px',
      panelClass: 'settings-dialog-margin-top-0',
    });
  }

  public openEditModal(element: PasswordData): void {
    this.matDialog.open(EditPasswordComponent, {
      data: element,
    }).afterClosed().subscribe((response: string) => {
      if (response === 'ok') {

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

  public applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public showPassword(element: PasswordData): void {
    this.passwordId = element.id;
  }

  public copyPassword(element: PasswordData): void {
    const textArea = document.createElement('textarea');
    textArea.value = element.password;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
    this.toastService.success(ToastMessages.successfullyCopied);
  }
}
