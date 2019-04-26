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
firebase.initializeApp(config);

import { InputsModule } from './inputs/inputs.module';
import { AppComponent } from './app.component';
import { CostComponent } from './cost/cost.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { reducers, initialState, metaReducer } from './reducers';
import { PaymentComponent } from './payment/payment.component';
import { SummaryComponent } from './summary/summary.component';
import { TransactionsComponent } from './transactions/transactions.component';

@NgModule({
  declarations: [AppComponent, CostComponent, PaymentComponent, SummaryComponent, TransactionsComponent],
  imports: [
  BrowserModule,
    FormsModule,
    InputsModule,
    StoreModule.forRoot(reducers, {
      initialState,
      metaReducers: [ metaReducer ]
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
