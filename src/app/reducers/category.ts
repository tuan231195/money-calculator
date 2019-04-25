import { ICategory } from '../model/category';
import {
  actions as categoryActions,
  EditCategory,
  DeleteCategory,
  AddCategory,
} from '../actions/category';
import { actions as stateActions } from '../actions/state';
import { actions as personActions, DeletePerson } from '../actions/people';
let count = 1;

export function categoryReducer(state: ICategory[] = [], action): ICategory[] {
  switch (action.type) {
    case stateActions.LOAD_STATE:
      count = state.length + 1;
      return state;
    case stateActions.CLEAR_STATE:
      count = 1;
      return state;
    case categoryActions.ADD_CATEGORY:
      return [...state, { id: count++, ...(<AddCategory>action).category }];
    case categoryActions.DELETE_CATEGORY:
      return state.filter(
        category => (<DeleteCategory>action).id !== category.id
      );
    case categoryActions.EDIT_CATEGORY:
      return state.map(category => {
        const editAction = <EditCategory>action;
        if (category.id === editAction.category.id) {
          return editAction.category;
        } else {
          return category;
        }
      });
    case personActions.DELETE_PERSON:
      return state.map(category => {
        const deleteAction = <DeletePerson>action;
        return {
          ...category,
          payee: Object.keys(category.payee).reduce((agg, currentPayee) => {
            if (+currentPayee === deleteAction.id) {
              return agg;
            }
            return { ...agg, [currentPayee]: category.payee[currentPayee] };
          }, {}),
        };
      });
    default:
      return state;
  }
}
