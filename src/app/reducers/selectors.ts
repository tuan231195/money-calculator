import { AppState } from '.';
import {
  ICategory,
  isValid as isCategoryValid,
  getNumPayee,
} from '../model/category';
import { IPayment, isValid as isPaymentValid } from '../model/payment';
import { IPerson, isValid as isPersonValid } from '../model/person';
import { createSelector } from '@ngrx/store';
import { ISummary } from '../model/summary';
import { ITransaction } from '../model/transaction';
import { min } from '../utility/array';

export const getPaymentState: (state: AppState) => IPayment[] = state =>
  state.payments;

export const getCategoryState: (state: AppState) => ICategory[] = state =>
  state.categories;

export const getPeopleState: (state: AppState) => IPerson[] = (
  state: AppState
) => state.people;

export const getSummary = createSelector(
  getPeopleState,
  getCategoryState,
  getPaymentState,
  function(people, categories, payments) {
    const summaries: ISummary[] = [];
    for (const person of people) {
      if (!isPersonValid(person)) {
        continue;
      }
      const summary: ISummary = {
        person: '#' + person.id + ' - ' + person.name,
        received: 0,
        paid: 0,
        mustPay: 0,
        balance: 0,
      };
      summaries.push(summary);
      for (const category of categories) {
        if (!isCategoryValid(category)) {
          continue;
        }
        if (category.payee[person.id]) {
          const numPayee = getNumPayee(category);
          summary.mustPay += category.amount / numPayee;
        }

        if (category.payerId === person.id) {
          summary.paid += category.amount;
        }
      }

      for (const payment of payments) {
        if (!isPaymentValid(payment)) {
          continue;
        }
        if (payment.receiverId === person.id) {
          summary.received += payment.amount * payment.senderIds.length;
        }
        if (payment.senderIds.includes(person.id)) {
          summary.paid += payment.amount;
        }
      }

      summary.balance = summary.received - summary.paid + summary.mustPay;
    }

    return summaries;
  }
);

export const getTransactions = createSelector(
  getSummary,
  summaries => {
    const transactions: ITransaction[] = [];

    const minBalanceSummary = min(summaries, 'balance');

    for (const summary of summaries) {
      if (summary.balance === 0 || summary === minBalanceSummary) {
        continue;
      }

      if (summary.balance > 0) {
        transactions.push({
          from: summary.person,
          to: minBalanceSummary.person,
          amount: summary.balance,
        });
      } else {
        transactions.push({
          from: minBalanceSummary.person,
          to: summary.person,
          amount: Math.abs(summary.balance),
        });
      }
    }
    return transactions;
  }
);
