import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private authService: AuthService, private router: Router, private toastService: ToastService) {}

  public canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.authState$.pipe(map(state => {
      if (state !== null) {
        return true;
      } else {
        this.router.navigate(['/login']);
        this.toastService.error('You are not authorized to see this page. Please log in');
        return false;
      }
    }));
  }
}
