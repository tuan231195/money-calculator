import { ICategory } from '../model/category';
import { actions, EditCategory, DeleteCategory, AddCategory } from '../actions/category';
let count = 1;

export function categoryReducer(state: ICategory[] = [], action): ICategory[] {
  switch (action.type) {
    case actions.ADD_CATEGORY:
      return [
        ...state,
        { id: count ++ , ...(<AddCategory>action).category },
      ];
    case actions.DELETE_CATEGORY:
      return state.filter(
        category => (<DeleteCategory>action).id !== category.id
      );
    case actions.EDIT_CATEGORY:
      return state.map(category => {
        const editAction = <EditCategory>action;
        if (category.id === editAction.category.id) {
          return editAction.category;
        } else {
          return category;
        }
      });
    default:
      return state;
  }
}
