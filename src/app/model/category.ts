import { ICategory } from './category';
export interface ICategory {
  payerId: number;
  payee: { [key: number]: boolean };
  name: string;
  amount: number;
  id?: number;
}

export function isValid(category: ICategory) {
  return (
    getNumPayee(category) > 0 &&
    category.payerId != undefined &&
    category.name != undefined &&
    category.name !== '' &&
    category.amount > 0
  );
}

export function getNumPayee(category: ICategory) {
  return Object.values(category.payee).filter(value => value).length;
}
