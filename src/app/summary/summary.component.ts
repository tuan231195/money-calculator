import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AppState } from '../reducers';
import { Store } from '@ngrx/store';
import { getSummary } from '../reducers/selectors';
import { Subscription, Observable } from 'rxjs';
import { ISummary } from '../model/summary';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryComponent implements OnInit {
  summaries$: Observable<ISummary[]>;
  subscription: Subscription;
  total;
  summaries: ISummary[] = [];
  constructor(private store: Store<AppState>, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.summaries$ = this.store.select(getSummary);
    this.subscription = this.summaries$.subscribe(summaries => {
      this.summaries = summaries;
      this.total = { balance: 0, received: 0, mustPay: 0, paid: 0 }
      for (const summary of summaries) {
        this.total.balance += summary.balance;
        this.total.received += summary.received;
        this.total.mustPay += summary.mustPay;
        this.total.paid += summary.paid;
      }
      this.cd.detectChanges();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
