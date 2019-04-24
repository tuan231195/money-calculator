import { Action } from '@ngrx/store';
import { IPayment } from '../model/payment';
import { AppState } from '../reducers/index';

export const actions = {
  ADD_PAYMENT: 'add_payment',
  DELETE_PAYMENT: 'delete_payment',
  EDIT_PAYMENT: 'edit_payment',
};

export class AddPayment implements Action {
  readonly type = actions.ADD_PAYMENT;
  constructor() {}
}

export class DeletePayment implements Action {
  readonly type = actions.DELETE_PAYMENT;
  constructor(public id: number) {}
}

export class EditPayment implements Action {
  readonly type = actions.EDIT_PAYMENT;
  constructor(public payment: IPayment) {}
}

export type Actions = AddPayment | DeletePayment;

export const getPaymentState: (state: AppState) => IPayment[] = state =>
  state.payments;
