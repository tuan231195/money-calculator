import { Action } from '@ngrx/store';
import { IPerson } from '../model/person';
import { AppState } from '../reducers/index';

export const actions = {
  ADD_PERSON: 'add_person',
  DELETE_PERSON: 'delete_person',
  EDIT_PERSON: 'edit_person',
};

export class AddPerson implements Action {
  readonly type = actions.ADD_PERSON;
}

export class DeletePerson implements Action {
  readonly type = actions.DELETE_PERSON;
  constructor(public id: number) {}
}

export class EditPerson implements Action {
  readonly type = actions.EDIT_PERSON;
  constructor(public person: IPerson) {}
}

export type Actions = AddPerson | DeletePerson;
