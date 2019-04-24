/// <reference types="jquery" />
/// <reference types="semantic-ui" />
import {
  Component,
  Input,
  AfterViewInit,
  ElementRef,
  OnChanges,
  DoCheck,
  Self,
} from '@angular/core';
import {
  makeValueAccessor,
  AbstractValueAccessor,
} from 'src/app/core/inputs/abstract-value-accessor';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [makeValueAccessor(SelectComponent)],
})
export class SelectComponent extends AbstractValueAccessor<string[] | string>
  implements AfterViewInit {
  @Input() name;
  @Input() options: { name: string; value: string }[];
  @Input() allowMultiple: boolean;
  @Input() required: boolean;
  @Input() placeholder: string;

  select: any;

  constructor(private elementRef: ElementRef) {
    super();
  }

  ngAfterViewInit() {
    this.select = $(this.elementRef.nativeElement).find('.ui.dropdown');
    this.select.dropdown({
      onChange: value => {
        this.value = value;
      },
    });
  }

  onDisabled(isDisabled) {
    super.onDisabled(isDisabled);
    this.select.toggleClass('disabled', isDisabled);
  }

  hasError() {
    if (!this.required) {
      return false;
    }
    if (this.allowMultiple) {
      return !(this.value && this.value.length);
    }

    return this.value == null || this.value === '';
  }

  onValueUpdated(value) {
    if (!this.select) return;
    super.onValueUpdated(value);
    if (this.value != null && this.value !== '') {
      this.select.dropdown('set selected', value);
    } else {
      this.select.dropdown('clear');
    }
  }
}
