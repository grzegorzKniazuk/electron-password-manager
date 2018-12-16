import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppInformations } from '../interfaces/app-informations';
import { PasswordData } from '../interfaces/password-data';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private defaultInfo: AppInformations = {
    version: '1.0.0',
    credentialsCount: 0,
    passwordGenerated: 0,
  };
  private data: PasswordData[] = [];

  public appInformations$: BehaviorSubject<AppInformations> = new BehaviorSubject(null);

  public update(): void {
    // should be httpClient and REST endpoint
  }

  public initDefaultApplicationInfo(): void {
    if (!JSON.parse(localStorage.getItem('app-info'))) {
      localStorage.setItem('app-info', JSON.stringify(this.defaultInfo));
    } else {
      this.defaultInfo = JSON.parse(localStorage.getItem('app-info'));
    }
  }

  public get appVersion(): string { // should be httpClient and REST endpoint
    return JSON.parse(localStorage.getItem('app-info')).version;
  }

  public loadCredentialsCounter(): void {
    this.data = JSON.parse(localStorage.getItem('data'));
    this.defaultInfo.credentialsCount = this.data.length;
    this.saveInformations();
  }

  public increasePasswordGeneratedCounter(): void {
    this.defaultInfo.passwordGenerated = this.defaultInfo.passwordGenerated + 1;
    this.saveInformations();
  }

  private saveInformations(): void {
    localStorage.setItem('app-info', JSON.stringify(this.defaultInfo));
    this.appInformations$.next(JSON.parse(localStorage.getItem('app-info')));
  }
}
