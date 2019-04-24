import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputsModule } from './inputs/inputs.module';
import { AppComponent } from './app.component';
import { CostComponent } from './cost/cost.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { reducers } from './reducers';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  declarations: [AppComponent, CostComponent, PaymentComponent],
  imports: [
    BrowserModule,
    FormsModule,
    InputsModule,
    StoreModule.forRoot(reducers),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
