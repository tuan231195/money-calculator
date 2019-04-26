import { Component, OnInit } from '@angular/core';
import { AppState } from './reducers';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase/app';
import { ClearState, LoadState } from './actions/state';
import { take } from 'rxjs/operators';
import * as shortuuid from 'short-uuid';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  value: any;
  loading: boolean;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    const urlParams = new URLSearchParams(window.location.search);
    const dataId = urlParams.get('state');
    if (dataId) {
      this.loading = true;
      firebase
        .database()
        .ref(dataId)
        .once('value')
        .then(snapshot => {
          this.store.dispatch(new LoadState(snapshot.val()));
        })
        .catch(() => alert('Failed to load data'))
        .finally(() => (this.loading = false));
    }
  }

  clearData() {
    this.store.dispatch(new ClearState());
  }

  saveData() {
    this.store.pipe(take(1)).subscribe(state => {
      const shortId = shortuuid.uuid();
      firebase
        .database()
        .ref(shortId)
        .set(state)
        .then(() => alert('Saved data successfully'))
        .catch(() => alert('Failed to save data'));
      const fullPath = `${window.location.pathname}?state=${shortId}`;
      window.history.replaceState(null, null, fullPath);
    });
  }
}
