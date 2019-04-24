import { ICategory } from './category';
export interface ICategory {
  payerId: number;
  payee: object;
  name: string;
  amount: number;
  id?: number;
}
