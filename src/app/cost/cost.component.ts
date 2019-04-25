import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICategory, getNumPayee } from '../model/category';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers/index';
import { AddPerson, EditPerson } from '../actions/people';
import { DeletePerson } from '../actions/people';
import { DeleteCategory, AddCategory, EditCategory } from '../actions/category';
import { Observable, Subscription } from 'rxjs';
import { IPerson } from '../model/person';
import { IPayment } from '../model/payment';
import {
  getPeopleState,
  getCategoryState,
  getPaymentState,
} from '../reducers/selectors';

@Component({
  selector: 'app-cost',
  templateUrl: './cost.component.html',
})
export class CostComponent implements OnInit, OnDestroy {
  people$: Observable<IPerson[]>;
  categories$: Observable<ICategory[]>;
  peopleSubscription: Subscription;
  payerOptions: { name: string; value: number }[];
  categories: ICategory[];
  categoriesSubscription: Subscription;
  payments$: Observable<IPayment[]>;

  paymentSubscription: Subscription;
  payments: IPayment[];
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.people$ = this.store.select(getPeopleState);
    this.categories$ = this.store.select(getCategoryState);
    this.payments$ = this.store.select(getPaymentState);

    this.peopleSubscription = this.people$.subscribe(people => {
      this.payerOptions = people.map(person => ({
        name: person.name,
        value: person.id,
      }));
    });

    this.categoriesSubscription = this.categories$.subscribe(categories => {
      this.categories = categories;
    });

    this.paymentSubscription = this.payments$.subscribe(payments => {
      this.payments = payments;
    });
  }

  ngOnDestroy() {
    this.peopleSubscription.unsubscribe();
    this.categoriesSubscription.unsubscribe();
  }

  getAmount(category, person) {
    const numPayee = getNumPayee(category);
    if (!numPayee) {
      return 0;
    }
    if (!category.payee[person.id]) {
      return 0;
    }
    return category.amount / numPayee;
  }
  addPerson() {
    this.store.dispatch(new AddPerson());
  }

  tickCategory(category) {
    this.payerOptions.forEach(({ value }) => {
      category.payee[value] = true;
    });

    this.store.dispatch(new EditCategory(category));
  }

  untickCategory(category) {
    this.payerOptions.forEach(({ value }) => {
      category.payee[value] = false;
    });

    this.store.dispatch(new EditCategory(category));
  }

  editPerson(person) {
    this.store.dispatch(new EditPerson(person));
  }

  removePerson(person) {
    this.store.dispatch(new DeletePerson(person.id));
  }

  canRemove(person) {
    const isPayer = this.categories.some(
      category => category.payerId === person.id
    );
    if (isPayer) {
      return false;
    }

    const hasUpfrontPayment = this.payments.some(
      payment =>
        payment.receiverId === person.id ||
        payment.senderIds.includes(person.id)
    );

    if (hasUpfrontPayment) {
      return false;
    }
    return true;
  }

  addCategory() {
    const category = {
      name: '',
      payerId: this.payerOptions[0] ? this.payerOptions[0].value : null,
      payee: {},
      amount: 0,
    };
    this.store.dispatch(new AddCategory(category));
  }

  editCategory(category) {
    this.store.dispatch(new EditCategory(category));
  }

  removeCategory(category) {
    this.store.dispatch(new DeleteCategory(category.id));
  }
}
