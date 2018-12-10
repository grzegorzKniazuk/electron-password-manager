import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

export class PasswordDataResolve implements Resolve<PasswordDataResolve[]> {
  public resolve(route: ActivatedRouteSnapshot,
                 state: RouterStateSnapshot): Observable<PasswordDataResolve[]> | Promise<PasswordDataResolve[]> | PasswordDataResolve[] {
    return undefined;
  }
}
