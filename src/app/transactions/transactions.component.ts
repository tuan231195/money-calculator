import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import {
  getTransactions,
  getSummary,
  getReceiverState,
} from '../reducers/selectors';
import { EditReceiver } from '../actions/people';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
})
export class TransactionsComponent implements OnDestroy, OnInit {
  transactions$: any;
  summarySubscription: Subscription;
  receiverSubscription: Subscription;
  receiver: number;
  receiverOptions: { name: string; value: number }[];
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.transactions$ = this.store.select(getTransactions);
    this.summarySubscription = this.store
      .select(getSummary)
      .subscribe(summaries => {
        this.receiverOptions = summaries
          .filter(summary => summary.balance < 0)
          .map(summary => ({ name: summary.person, value: summary.personId }));
      });
    this.receiverSubscription = this.store
      .select(getReceiverState)
      .subscribe(receiver => {
        this.receiver = receiver;
      });
  }

  ngOnDestroy() {
    this.receiverOptions = null;
  }

  changeReceiver(receiver) {
    this.store.dispatch(new EditReceiver(receiver));
  }
}
