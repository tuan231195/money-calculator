import { Component, OnInit } from '@angular/core';
import { AppState } from '../reducers';
import { Store } from '@ngrx/store';
import { getSummary } from '../reducers/selectors';
import { Subscription, Observable } from 'rxjs';
import { ISummary } from '../model/summary';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
})
export class SummaryComponent implements OnInit {
  summaries$: Observable<ISummary[]>;
  subscription: Subscription;
  total;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.summaries$ = this.store.select(getSummary);
    this.subscription = this.summaries$.subscribe(summaries => {
      this.total = { balance: 0, received: 0, mustPay: 0, paid: 0 }
      for (const summary of summaries) {
        this.total.balance += summary.balance;
        this.total.received += summary.received;
        this.total.mustPay += summary.mustPay;
        this.total.paid += summary.paid;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
