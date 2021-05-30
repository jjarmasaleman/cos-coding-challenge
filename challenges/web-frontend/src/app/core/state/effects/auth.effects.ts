import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthState } from '@core/state/';
import { Login, Logout, UserRequested } from '@core/state/actions/auth.actions';
import { ActionEnum } from '@core/state/enums/action.enum';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Injectable()
export class AuthEffects implements OnDestroy {
  private returnUrl: string;
  private unsubscribe: Subject<void>;

  constructor(private actions$: Actions, private router: Router, private store: Store<AuthState>) {
    this.unsubscribe = new Subject();
    this.returnUrl = '';

    this.router.events.pipe(takeUntil(this.unsubscribe)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.returnUrl = event.url;
      }
    });
  }

  public login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<Login>(ActionEnum.Login),
      tap(() => {
        this.store.dispatch(new UserRequested());
      })
    );
  });

  public logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<Logout>(ActionEnum.Logout),
      tap(() => {
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: this.returnUrl } });
      })
    );
  });

  public loadUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<UserRequested>(ActionEnum.UserRequested),
      tap((user) => {
        if (user) {
          return { type: ActionEnum.UserLoaded, payload: user };
        } else {
          return { type: ActionEnum.Logout };
        }
      })
    );
  });

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
