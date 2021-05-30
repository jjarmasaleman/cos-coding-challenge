import { ActionEnum } from '@core/state/enums/action.enum';
import { User } from '@modules/auth';
import { Action } from '@ngrx/store';

export class Login implements Action {
  public readonly type = ActionEnum.Login;

  constructor(public payload: { token: string }) {}
}

export class Logout implements Action {
  public readonly type = ActionEnum.Logout;
}

export class UserRequested implements Action {
  public readonly type = ActionEnum.UserRequested;
}

export class UserLoaded implements Action {
  public readonly type = ActionEnum.UserLoaded;

  constructor(public payload: { user: User }) {}
}

export type AuthActions = Login | Logout | UserRequested | UserLoaded;
