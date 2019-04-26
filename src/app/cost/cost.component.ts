import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  ICategory,
  getNumPayee,
  isValid as isCategoryValid,
} from '../model/category';
import { AddPerson, EditPerson } from '../actions/people';
import { DeletePerson } from '../actions/people';
import { DeleteCategory, AddCategory, EditCategory } from '../actions/category';
import { Observable, Subscription } from 'rxjs';
import { IPerson, isValid as isPersonValid } from '../model/person';
import { IPayment } from '../model/payment';
import {
  getPeopleState,
  getCategoryState,
  getPaymentState,
} from '../reducers/selectors';
import { AppState } from '../reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-cost',
  templateUrl: './cost.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostComponent implements OnInit, OnDestroy {
  isPersonValid = isPersonValid;
  isCategoryValid = isCategoryValid;
  people$: Observable<IPerson[]>;
  categories$: Observable<ICategory[]>;
  peopleSubscription: Subscription;
  payerOptions: { name: string; value: number }[];
  categories: ICategory[] = [];
  categoriesSubscription: Subscription;
  payments$: Observable<IPayment[]>;

  paymentSubscription: Subscription;
  payments: IPayment[] = [];
  people: IPerson[] = [];
  constructor(private store: Store<AppState>, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.people$ = this.store.select(getPeopleState);
    this.categories$ = this.store.select(getCategoryState);
    this.payments$ = this.store.select(getPaymentState);

    this.peopleSubscription = this.people$.subscribe(people => {
      this.payerOptions = people.map(person => ({
        name: person.name,
        value: person.id,
      }));
      this.people = people;
      this.cd.detectChanges();
    });

    this.categoriesSubscription = this.categories$.subscribe(categories => {
      this.categories = categories;
      this.cd.detectChanges();
    });

    this.paymentSubscription = this.payments$.subscribe(payments => {
      this.payments = payments;
      this.cd.detectChanges();
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

  getPersonCategoryTooltip(person, category) {
    return `Person: #${person.id} - ${person.name},
    Category: #${category.id} - ${category.name}
    `;
  }

  getPersonTooltip(person) {
    return `Person: #${person.id} - ${person.name}`;
  }

  getCategoryTooltip(category) {
    return `Category: #${category.id} - ${category.name}`;
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
