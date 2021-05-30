import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { isLoggedIn } from '@core/state/selectors/auth.selectors';
import { AuthState } from '@core/state/state';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AuthState>, private router: Router) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.pipe(
      select(isLoggedIn),
      tap((loggedIn) => {
        if (!loggedIn) {
          const returnUrl = state.url.split(/[?#]/)[0];

          // Allow the user to return to the requested url after logging in
          this.router.navigate(['/auth/login'], { queryParams: { returnUrl } });
        }
      })
    );
  }
}
