import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import {
  getTransactions,
  getSummary,
  getReceiverState,
} from '../reducers/selectors';
import { EditReceiver } from '../actions/people';
import { Subscription } from 'rxjs';
import { ITransaction } from '../model/transaction';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsComponent implements OnDestroy, OnInit {
  summarySubscription: Subscription;
  receiverSubscription: Subscription;
  receiver: number;
  receiverOptions: { name: string; value: number }[];
  transactions: ITransaction[];
  transactionSubscription: Subscription;
  constructor(private store: Store<AppState>, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.transactionSubscription = this.store.select(getTransactions).subscribe(transactions => {
      this.transactions = transactions;
      this.cd.detectChanges();
    });
    this.summarySubscription = this.store
      .select(getSummary)
      .subscribe(summaries => {
        this.receiverOptions = summaries
          .filter(summary => summary.balance < 0)
          .map(summary => ({ name: summary.person, value: summary.personId }));
        this.cd.detectChanges();
      });
    this.receiverSubscription = this.store
      .select(getReceiverState)
      .subscribe(receiver => {
        this.receiver = receiver;
        this.cd.detectChanges();
      });
  }

  ngOnDestroy() {
    this.summarySubscription.unsubscribe();
    this.receiverSubscription.unsubscribe();
    this.transactionSubscription.unsubscribe();
    this.receiverOptions = null;
  }

  changeReceiver(receiver) {
    this.store.dispatch(new EditReceiver(receiver));
  }
}
