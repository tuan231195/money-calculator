import {
  actions,
  EditReceiver,
} from '../actions/people';

export function receiverReducer(state: number = null, action): number {
  switch (action.type) {
    case actions.EDIT_RECEIVER:
      return (<EditReceiver>action).receiver;
    default:
      return state;
  }
}
