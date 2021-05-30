import { AuthState } from '@core/state';
import { createSelector } from '@ngrx/store';

export const selectLoggedInState = (state: AuthState): boolean => {
  return state.loggedIn;
};

export const isLoggedIn = createSelector(selectLoggedInState, (loggedIn) => loggedIn);
