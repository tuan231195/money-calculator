import { IPerson } from '../model/person';
import { actions, EditPerson, DeletePerson } from '../actions/people';
import { actions as stateActions } from '../actions/state';
let count = 1;

export function peopleReducer(state: IPerson[] = [], action): IPerson[] {
  switch (action.type) {
    case stateActions.LOAD_STATE:
      count = state.length + 1;
      return state;
    case stateActions.CLEAR_STATE:
      count = 1;
      return state;
    case actions.ADD_PERSON:
      return [
        ...state,
        {
          id: count++,
          name: '',
        },
      ];
    case actions.DELETE_PERSON:
      return state.filter(person => (<DeletePerson>action).id !== person.id);
    case actions.EDIT_PERSON:
      return state.map(person => {
        const deleteAction = <EditPerson>action;
        if (person.id === deleteAction.person.id) {
          return deleteAction.person;
        } else {
          return person;
        }
      });
    default:
      return state;
  }
}
