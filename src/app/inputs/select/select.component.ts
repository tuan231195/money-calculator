/// <reference types="jquery" />
/// <reference types="semantic-ui" />
import { Component, Input, AfterViewInit, ElementRef } from '@angular/core';
import {
  makeValueAccessor,
  AbstractValueAccessor,
} from 'src/app/core/inputs/abstract-value-accessor';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
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
      onChange: valueStr => {
        if (this.allowMultiple) {
          const selectedValues = valueStr.split(',');
          this.value = this.options
            .map(option => option.value)
            .filter(value =>
              selectedValues.some(selectedValue => selectedValue == value)
            );
        } else {
          const foundOption = this.options.find(
            option => option.value == valueStr
          );
          this.value = foundOption ? foundOption.value : null;
        }
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
