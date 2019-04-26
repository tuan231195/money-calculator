import { ActionReducerMap, ActionReducer } from '@ngrx/store';
import { ICategory } from '../model/category';
import { peopleReducer } from './people';
import { categoryReducer } from './category';
import { paymentsReducer } from './payment';
import { IPerson } from '../model/person';
import { IPayment } from '../model/payment';
import { LoadState, actions } from '../actions/state';
import { receiverReducer } from './receiver';

export interface AppState {
  people: IPerson[];
  categories: ICategory[];
  payments: IPayment[];
  receiver: number,
}

export const reducers: ActionReducerMap<AppState> = {
  people: peopleReducer,
  categories: categoryReducer,
  payments: paymentsReducer,
  receiver: receiverReducer,
};

export const initialState: AppState = {
  people: [],
  categories: [],
  payments: [],
  receiver: null,
};

export function metaReducer(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return function(state, action) {
    let newState;
    switch (action.type) {
      case actions.CLEAR_STATE:
        newState = initialState;
        return reducer(newState, action);
      case actions.LOAD_STATE:
        newState = (<LoadState>action).state;
        return reducer(newState, action);
      default:
        return reducer(state, action);
    }
  };
}

export function stateSetter(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state: any, action: any) {
    if (action.type === 'SET_ROOT_STATE') {
      return action.payload;
    }
    return reducer(state, action);
  };
}
