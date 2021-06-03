import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthState, UserLoaded } from '@core/state';
import { Login, Logout } from '@core/state/actions/auth.actions';
import { ActionEnum } from '@core/state/enums/action.enum';
import { storage } from '@globals/storage';
import { AuthService } from '@modules/auth';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { defer, of, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Injectable()
export class AuthEffects implements OnDestroy {
  private returnUrl: string;
  private unsubscribe: Subject<void>;

  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService,
    private store: Store<AuthState>
  ) {
    this.returnUrl = '';
    this.unsubscribe = new Subject();

    this.router.events.pipe(takeUntil(this.unsubscribe)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.returnUrl = event.url.split(/[?#]/)[0];
      }
    });
  }

  public login$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType<Login>(ActionEnum.Login),
        tap((action) => {
          const user = this.authService.parseUser(action.payload.auth);

          if (user) {
            localStorage.setItem(storage.authKey, JSON.stringify(action.payload.auth));

            this.store.dispatch(new UserLoaded({ user }));
          } else {
            this.store.dispatch(new Logout());
          }
        })
      );
    },
    { dispatch: false }
  );

  public logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType<Logout>(ActionEnum.Logout),
        tap((action) => {
          localStorage.removeItem(storage.authKey);

          if (action.payload?.forced) {
            this.router.navigate(['/login'], { state: { accessDenied: true } });
          } else {
            this.router.navigate(['/login'], { queryParams: { returnUrl: this.returnUrl } });
          }
        })
      );
    },
    { dispatch: false }
  );

  public init$ = createEffect(() => {
    return defer(() => {
      const auth = localStorage.getItem(storage.authKey);

      if (auth) {
        const parsedAuth = JSON.parse(auth);

        return of(new Login({ auth: parsedAuth }));
      }

      return of({ type: 'NO_ACTION' });
    });
  });

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
