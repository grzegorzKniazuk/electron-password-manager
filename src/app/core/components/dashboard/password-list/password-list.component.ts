import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatDialog } from '@angular/material';
import { PasswordData } from '../../../interfaces/password-data';
import { ToastService } from '../../../services/toast.service';
import { ToastMessages } from '../../../enums/toast-messages.enum';
import { DataService } from '../../../services/data.service';
import { Modal } from '../../../models/modal.model';

@Component({
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordListComponent extends Modal implements OnInit, AfterContentInit {

  public readonly columnList: string[] = [ 'date', 'website', 'login', 'password', 'actions' ];
  public passwordId: number;
  private randomGeneratedPassword: string;

  constructor(private dataService: DataService,
              protected matBottomSheet: MatBottomSheet,
              protected toastService: ToastService,
              protected matDialog: MatDialog,
              protected changeDetectorRef: ChangeDetectorRef) {
    super(matDialog, toastService, changeDetectorRef, matBottomSheet);
  }

  ngOnInit() {
    super.initSettings();
    super.initData();
    super.initPagination();
    super.initSort();
    this.initFilter();
    this.dataService.initDefaultApplicationInfo();
  }

  public ngAfterContentInit(): void {
    this.welcome();
  }

  private welcome(): void {
    setTimeout(() => {
      this.toastService.success(ToastMessages.welcomeBack);
    });
  }

  private initFilter(): void {
    this.dataSource.filterPredicate = (data: PasswordData, filter: string) => {
      return data.refersTo.trim().toLowerCase().includes(filter.trim().toLowerCase());
    };
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
    this.dataService.increasePasswordGeneratedCounter();
  }
}
