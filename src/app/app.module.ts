import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as firebase from 'firebase/app';
const config = {
  apiKey: environment.firebase.apiKey,
  authDomain: environment.firebase.authDomain,
  databaseURL: environment.firebase.databaseURL,
  projectId: environment.firebase.projectId,
  storageBucket: environment.firebase.storageBucket,
  messagingSenderId: environment.firebase.messagingSenderId,
};
import 'firebase/database';
import 'firebase/auth';
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

import { InputsModule } from './inputs/inputs.module';
import { AppComponent } from './app.component';
import { CostComponent } from './cost/cost.component';
import { StoreModule, Store } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import {
  reducers,
  initialState,
  metaReducer,
  stateSetter,
  AppState,
} from './reducers';
import { PaymentComponent } from './payment/payment.component';
import { SummaryComponent } from './summary/summary.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { take } from 'rxjs/operators';

@NgModule({
  declarations: [
    AppComponent,
    CostComponent,
    PaymentComponent,
    SummaryComponent,
    TransactionsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    InputsModule,
    StoreModule.forRoot(reducers, {
      initialState,
      metaReducers: [metaReducer, stateSetter],
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private store: Store<AppState>) {}

  hmrOnDestroy(store) {
    this.store.pipe(take(1)).subscribe(s => (store.rootState = s));
  }

  hmrOnInit(store) {
    if (!store || !store.rootState) {
      return;
    }
    // restore state by dispatch a SET_ROOT_STATE action
    if (store.rootState) {
      this.store.dispatch({
        type: 'SET_ROOT_STATE',
        payload: store.rootState,
      });
    }
  }
}
