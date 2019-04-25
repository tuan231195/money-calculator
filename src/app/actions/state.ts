import { Action } from '@ngrx/store';
import { IPerson } from '../model/person';
import { AppState } from '../reducers';

export const actions = {
  CLEAR_STATE: 'clear_state',
  LOAD_STATE: 'load_state',
};

export class ClearState implements Action {
  readonly type = actions.CLEAR_STATE;
}

export class LoadState implements Action {
  readonly type = actions.LOAD_STATE;
  constructor(public state: AppState) {}
}

export type Actions = ClearState | LoadState;
