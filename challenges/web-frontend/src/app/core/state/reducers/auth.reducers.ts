import { AuthState } from '@core/state';
import { AuthActions } from '@core/state/actions/auth.actions';
import { ActionEnum } from '@core/state/enums/action.enum';

export const defaultState: AuthState = {
  accessDenied: false,
  loggedIn: false,
  user: undefined,
};

export function authReducer(state: AuthState, action: AuthActions): AuthState {
  switch (action.type) {
    case ActionEnum.Login: {
      return {
        accessDenied: false,
        loggedIn: true,
        user: undefined,
      };
    }
    case ActionEnum.UserLoaded: {
      return {
        ...state,
        user: action.payload.user,
      };
    }
    case ActionEnum.Logout: {
      return {
        ...defaultState,
        accessDenied: action.payload?.forced ?? false,
      };
    }
    default:
      return state ?? defaultState;
  }
}
