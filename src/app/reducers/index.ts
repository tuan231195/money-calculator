import { ActionReducerMap } from '@ngrx/store';
import { ICategory } from '../model/category';
import { peopleReducer } from './people';
import { categoryReducer } from './category';
import { paymentsReducer } from './payment';
import { IPerson } from '../model/person';
import { IPayment } from '../model/payment';

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
