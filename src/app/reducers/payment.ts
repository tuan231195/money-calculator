import { IPayment } from '../model/payment';
import { actions, EditPayment, DeletePayment } from '../actions/payment';
import { actions as stateActions } from '../actions/state';

let count = 1;

export function paymentsReducer(state: IPayment[] = [], action): IPayment[] {
  switch (action.type) {
    case stateActions.LOAD_STATE:
      count = state.length + 1;
      return state;
    case stateActions.CLEAR_STATE:
      count = 1;
      return state;
    case actions.ADD_PAYMENT:
      return [
        ...state,
        {
          id: count++,
          amount: 0,
          senderIds: [],
          receiverId: null,
        },
      ];
    case actions.DELETE_PAYMENT:
      return state.filter(payment => (<DeletePayment>action).id !== payment.id);
    case actions.EDIT_PAYMENT:
      return state.map(payment => {
        const deleteAction = <EditPayment>action;
        if (payment.id === deleteAction.payment.id) {
          return deleteAction.payment;
        } else {
          return payment;
        }
      });
    default:
      return state;
  }
}
