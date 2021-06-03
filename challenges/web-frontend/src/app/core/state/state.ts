import { User } from '@modules/auth';
import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {}

export interface AuthState {
  accessDenied: boolean;
  loggedIn: boolean;
  user?: User;
}

// Reducers
export const reducers: ActionReducerMap<AppState> = { router: routerReducer };
