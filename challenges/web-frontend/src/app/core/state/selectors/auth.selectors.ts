import { AuthState } from '@core/state';
import { createSelector } from '@ngrx/store';

export const selectAuthState = (state: any): AuthState => {
  return state.auth;
};

export const isLoggedIn = createSelector(selectAuthState, (auth) => auth.loggedIn);

export const accessDenied = createSelector(selectAuthState, (auth) => auth.accessDenied);

export const currentUser = createSelector(selectAuthState, (auth) => auth.user);
