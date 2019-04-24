import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select/select.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [SelectComponent],
  imports: [CommonModule, FormsModule],
  exports: [SelectComponent],
})
export class InputsModule {}
