import { Action } from '@ngrx/store';
import { ICategory } from '../model/category';
import { AppState } from '../reducers/index';

export const actions = {
  ADD_CATEGORY: 'add_category',
  DELETE_CATEGORY: 'delete_category',
  EDIT_CATEGORY: 'edit_category',
};

export class AddCategory implements Action {
  readonly type = actions.ADD_CATEGORY;
  constructor(public category: ICategory) {}
}

export class DeleteCategory implements Action {
  readonly type = actions.DELETE_CATEGORY;
  constructor(public id: number) {}
}

export class EditCategory implements Action {
  readonly type = actions.EDIT_CATEGORY;
  constructor(public category: ICategory) {}
}

export type Actions = AddCategory | DeleteCategory;