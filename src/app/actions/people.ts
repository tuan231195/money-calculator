import { Action } from '@ngrx/store';
import { IPerson } from '../model/person';

export const actions = {
  ADD_PERSON: 'add_person',
  DELETE_PERSON: 'delete_person',
  EDIT_PERSON: 'edit_person',
  EDIT_RECEIVER: 'edit_receiver',
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

export class EditReceiver implements Action {
  readonly type = actions.EDIT_RECEIVER;
  constructor(public receiver: number) {}
}

export type Actions = AddPerson | DeletePerson;
