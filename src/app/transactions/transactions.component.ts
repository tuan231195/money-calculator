import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { getTransactions } from '../reducers/selectors';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
})
export class TransactionsComponent implements OnInit {
  transactions$: any;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.transactions$ = this.store.select(getTransactions);
  }
}
