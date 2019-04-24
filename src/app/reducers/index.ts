import { ActionReducerMap } from '@ngrx/store';
import { ICategory } from '../model/category';
import { peopleReducer } from './people';
import { categoryReducer } from './category';
import { IPerson } from '../model/person';

export interface AppState {
  people: IPerson[];
  categories: ICategory[];
}

export const reducers: ActionReducerMap<AppState> = {
  people: peopleReducer,
  categories: categoryReducer,
};
