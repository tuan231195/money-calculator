import { ActionReducerMap, ActionReducer } from '@ngrx/store';
import { ICategory } from '../model/category';
import { peopleReducer } from './people';
import { categoryReducer } from './category';
import { paymentsReducer } from './payment';
import { IPerson } from '../model/person';
import { IPayment } from '../model/payment';
import { LoadState, actions } from '../actions/state';

export interface AppState {
  people: IPerson[];
  categories: ICategory[];
  payments: IPayment[];
}

export const reducers: ActionReducerMap<AppState> = {
  people: peopleReducer,
  categories: categoryReducer,
  payments: paymentsReducer,
};

export const initialState: AppState = {
  people: [],
  categories: [],
  payments: [],
};

export function metaReducer(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return function(state, action) {
    switch (action.type) {
      case actions.CLEAR_STATE:
        return initialState;
      case actions.LOAD_STATE:
        return (<LoadState>action).state;
      default:
        return reducer(state, action);
    }
  };
}
