import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as firebase from 'firebase/app';
const config = {
  apiKey: "AIzaSyAPEyy7AAN79OV7BOQlfL_AoPwuZMri-eY",
  authDomain: "money-calculator-f7927.firebaseapp.com",
  databaseURL: "https://money-calculator-f7927.firebaseio.com",
  projectId: "money-calculator-f7927",
  storageBucket: "money-calculator-f7927.appspot.com",
  messagingSenderId: "156331328325"
};
import 'firebase/database';
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
