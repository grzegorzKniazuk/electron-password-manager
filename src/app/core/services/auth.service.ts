import { Injectable } from '@angular/core';
import { User, UserInfo } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Credentials } from '../interfaces/credentials';
import { ToastService } from './toast.service';
import UserCredential = firebase.auth.UserCredential;
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public readonly authState$: Observable<User | null> = this.angularFireAuth.authState;
  private userData: UserInfo;

  constructor(private angularFireAuth: AngularFireAuth, private toastService: ToastService) {
  }

  public login(credentials: Credentials): Promise<void> {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password).then(userData => {
      this.userData = userData.user;
    }).catch(error => {
      this.toastService.success(error);
    });
  }

  public register(credentials: Credentials): Promise<UserCredential> {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
  }

  public get user(): UserInfo {
    return this.userData;
  }

  public logout(): Promise<void> {
    return this.angularFireAuth.auth.signOut();
  }
}
