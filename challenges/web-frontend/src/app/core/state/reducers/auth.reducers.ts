import { AuthState } from '@core/state';
import { AuthActions } from '@core/state/actions/auth.actions';
import { ActionEnum } from '@core/state/enums/action.enum';

export const defaultState: AuthState = {
  loggedIn: false,
  user: undefined,
};

export function authReducer(state: AuthState, action: AuthActions): AuthState {
  switch (action.type) {
    case ActionEnum.Login: {
      return {
        loggedIn: true,
        user: undefined,
      };
    }
    case ActionEnum.Logout: {
      return defaultState;
    }
    case ActionEnum.UserLoaded: {
      return {
        ...state,
        user: action.payload.user,
      };
    }
    default:
      return state ?? defaultState;
  }
}
