import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {MatBottomSheet, MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AddPasswordComponent} from './add-password/add-password.component';
import {ToastService} from '../../../services/toast.service';
import {AuthService} from '../../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SettingsComponent} from '../settings/settings.component';
import {UserInfo} from 'firebase';
import {ResolveData} from '../../../interfaces/resolve-data';
import {PasswordData} from '../../../interfaces/password-data';
import {EditPasswordComponent} from './edit-password/edit-password.component';
import {ConfirmModalComponent} from '../../../../shared/components/confirm-modal/confirm-modal.component';
import {ToastMessages} from '../../../enums/toast-messages.enum';

@Component({
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordListComponent implements OnInit {

  @ViewChild(MatPaginator) private paginator: MatPaginator;
  @ViewChild(MatSort) private sort: MatSort;
  public user: UserInfo;
  public data: PasswordData[] = [
    { id: '1', refersTo: 'gmail.com', login: 'sampleLogin', password: 'samplePassword' },
    { id: '2', refersTo: 'www.gmail.com', login: 'sampleLogin', password: 'samplePassword' },
    { id: '3', refersTo: 'gmail.com', login: 'sampleLogin', password: 'samplePassword' },
    { id: '4', refersTo: 'www.gmail.com', login: 'sampleLogin', password: 'samplePassword' },
    { id: '5', refersTo: 'www.gmail.com', login: 'sampleLogin', password: 'samplePassword' },
    { id: '6', refersTo: 'www.gmail.com', login: 'sampleLogin', password: 'samplePassword' },
    { id: '7', refersTo: 'www.gmail.com', login: 'sampleLogin', password: 'samplePassword' },
    { id: '8', refersTo: 'www.gmail.com', login: 'sampleLogin', password: 'samplePassword' },
    { id: '9', refersTo: 'www.gmail.com', login: 'sampleLogin', password: 'samplePassword' },
    { id: '10', refersTo: 'www.gmail.com', login: 'sampleLogin', password: 'samplePassword' },
    { id: '11', refersTo: 'www.gmail.com', login: 'sampleLogin', password: 'samplePassword' },
    { id: '12', refersTo: 'www.gmail.com', login: 'sampleLogin', password: 'samplePassword' },
    { id: '13', refersTo: 'www.gmail.com', login: 'sampleLogin', password: 'samplePassword' },
    { id: '14', refersTo: 'www.gmail.com', login: 'sampleLogin', password: 'samplePassword' },
    { id: '15', refersTo: 'www.gmail.com', login: 'sampleLogin', password: 'samplePassword' },
  ];
  public dataSource = new MatTableDataSource<PasswordData>(this.data);
  public readonly columnList: string[] = [ 'website', 'login', 'password', 'actions' ];
  public passwordId = '';

  constructor(private matDialog: MatDialog,
              private matBottomSheet: MatBottomSheet,
              private toastService: ToastService,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.fetchUserData();
    this.initPagination();
    this.initSort();
    window.localStorage.setItem('test', 'aaaa');
    console.log(window.localStorage.getItem('test'));
  }

  private fetchUserData(): void {
    this.activatedRoute.data.subscribe((data: ResolveData) => {
      this.user = data.userData;
    });
  }

  private initSort(): void {
    this.dataSource.sort = this.sort;
  }

  private initPagination(): void {
    this.dataSource.paginator = this.paginator;
  }

  public openNewPasswordModal(): void {
    this.matDialog.open(AddPasswordComponent);
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
    });
  }

  public openConfirmDeleteModal(element: PasswordData): void {
    this.matBottomSheet.open(ConfirmModalComponent);
  }

  public logout(): void {
    this.authService.logout().then(() => {
      this.router.navigate(['login']);
      this.toastService.success(ToastMessages.logout);
    }).catch((error) => {
      this.toastService.error(error);
    });
  }

  public applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public showPassword(element: PasswordData): void {
    this.passwordId = element.id;
  }
}
