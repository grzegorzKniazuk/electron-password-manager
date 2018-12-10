import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {UserInfo} from 'firebase';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import * as firebase from 'firebase';
import {Injectable} from '@angular/core';

@Injectable()
export class UserDataResolve implements Resolve<UserInfo> {

  constructor(private authService: AuthService) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<firebase.UserInfo> | Promise<firebase.UserInfo> | firebase.UserInfo {
    return this.authService.user;
  }
}
