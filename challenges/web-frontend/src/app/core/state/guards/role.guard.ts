import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Logout } from '@core/state';
import { currentUser } from '@core/state/selectors/auth.selectors';
import { AppState } from '@core/state/state';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private store: Store<AppState>) {}

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.store.pipe(
      select(currentUser),
      map((user) => {
        const accessGranted = user?.roles.some((role) => route.data.roles.includes(role)) ?? false;

        if (!accessGranted) {
          this.store.dispatch(new Logout({ forced: true }));
        }

        return accessGranted;
      })
    );
  }
}
