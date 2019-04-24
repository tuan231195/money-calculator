import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICategory } from '../model/category';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers/index';
import { AddPerson, getPeopleState, EditPerson } from '../actions/people';
import { DeletePerson } from '../actions/people';
import {
  DeleteCategory,
  AddCategory,
  getCategoryState,
  EditCategory,
} from '../actions/category';
import { Observable, Subscription } from 'rxjs';
import { IPerson } from '../model/person';

@Component({
  selector: 'app-cost',
  templateUrl: './cost.component.html',
  styleUrls: ['./cost.component.scss'],
})
export class CostComponent implements OnInit, OnDestroy {
  people$: Observable<IPerson[]>;
  categories$: Observable<ICategory[]>;
  peopleSubscription: Subscription;
  payerOptions: { name: string; value: number }[];
  categories: ICategory[];
  categoriesSubscription: Subscription;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.people$ = this.store.select(getPeopleState);
    this.categories$ = this.store.select(getCategoryState);

    this.peopleSubscription = this.people$.subscribe(people => {
      this.payerOptions = people.map(person => ({
        name: person.name,
        value: person.id,
      }));
    });

    this.categoriesSubscription = this.categories$.subscribe(categories => {
      this.categories = categories;
    });
  }

  ngOnDestroy() {
    this.peopleSubscription.unsubscribe();
    this.categoriesSubscription.unsubscribe();
  }

  getAmount(category, person) {
    const numPayee = Object.values(category.payee).filter(value => value)
      .length;
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
    return !this.categories.some(category => category.payerId === person.id);
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
