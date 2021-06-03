import { ActionEnum } from '@core/state';
import { Auth, User } from '@modules/auth';
import { Action } from '@ngrx/store';

export class Login implements Action {
  public readonly type = ActionEnum.Login;

  constructor(public payload: { auth: Auth }) {}
}

export class UserLoaded implements Action {
  public readonly type = ActionEnum.UserLoaded;

  constructor(public payload: { user: User }) {}
}

export class Logout implements Action {
  public readonly type = ActionEnum.Logout;

  constructor(public payload?: { forced: boolean }) {}
}

export type AuthActions = Login | UserLoaded | Logout;
