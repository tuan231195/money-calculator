import { Component, OnInit } from '@angular/core';
import { AppState } from './reducers';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { LoadState, ClearState } from './actions/state';

const STATE_KEY = 'money-calculator-state';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  value: any;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    const store = this.store;
    $(window).on('beforeunload', function() {
      store.pipe(take(1)).subscribe(value => {
        localStorage.setItem(STATE_KEY, JSON.stringify(value));
      });

      return 'Do you want to exit?';
    });

    const savedData = localStorage.getItem(STATE_KEY);

    if (savedData) {
      const storeState = JSON.parse(savedData);
      store.dispatch(new LoadState(<AppState>storeState));
    }
  }

  clearData() {
    this.store.dispatch(new ClearState());
  }
}
