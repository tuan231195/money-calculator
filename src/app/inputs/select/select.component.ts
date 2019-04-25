/// <reference types="jquery" />
/// <reference types="semantic-ui" />
import {
  Component,
  Input,
  AfterViewInit,
  ElementRef,
  OnChanges,
  SimpleChanges,
  SimpleChange,
} from '@angular/core';
import {
  makeValueAccessor,
  AbstractValueAccessor,
} from 'src/app/core/inputs/abstract-value-accessor';
import { isEmpty } from 'src/app/utility/string';
import { simpleEqual } from 'src/app/utility/array';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  providers: [makeValueAccessor(SelectComponent)],
})
export class SelectComponent extends AbstractValueAccessor<string[] | string>
  implements AfterViewInit, OnChanges {
  @Input() name;
  @Input() options: { name: string; value: string }[];
  @Input() allowMultiple: boolean;
  @Input() required: boolean;
  @Input() placeholder: string;

  select: any;

  constructor(private elementRef: ElementRef) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options']) {
      const simpleChange: SimpleChange = changes['options'];
      if (simpleChange.currentValue) {
        setTimeout(() => {
          this.onValueUpdated(this.value);
        });
      }
    }
  }

  ngAfterViewInit() {
    this.select = $(this.elementRef.nativeElement).find('.ui.dropdown');
    this.select.dropdown({
      onChange: () => {
        if (this.select.data('skipOnChange')) {
          return;
        }
        const valueStr = this.select.dropdown('get value');
        if (this.allowMultiple) {
          const currentValues = isEmpty(valueStr)
            ? []
            : valueStr.split(',').map(val => this.getRealValue(val));

          if (simpleEqual(currentValues, this.value)) {
            return;
          }
          this.value = currentValues;
        } else {
          this.value = isEmpty(valueStr) ? null : this.getRealValue(valueStr);
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
    return this.isValueEmpty(this.value);
  }

  blur() {
    this.onTouched();
  }

  onValueUpdated(value) {
    if (!this.select) return;
    super.onValueUpdated(value);

    if (this.isValueEmpty(value)) {
      this.select.dropdown('clear');
    } else {
      const valueToSet = Array.isArray(this.value)
        ? this.value.map(val => this.getOptionValue(val))
        : this.getOptionValue(this.value);
      this.clearValues(true);
      this.select.data('skipOnChange', true);
      this.select.dropdown('set selected', valueToSet);
      this.select.data('skipOnChange', null);
    }
  }

  clearValues(skipOnChange) {
    this.select.data('skipOnChange', skipOnChange);
    this.select.dropdown('clear');
    this.select.data('skipOnChange', null);
  }

  getOptionValue(value) {
    if (typeof value === 'number') {
      return `number:${value}`;
    } else if (typeof value === 'object') {
      return `object:${JSON.stringify(value)}`;
    } else if (typeof value === 'boolean') {
      return `boolean:${value}`;
    }

    return `string:${value}`;
  }

  getRealValue(optionValue) {
    const parts = optionValue.split(':');
    const [type, value] = parts;

    switch (type) {
      case 'number':
        return Number(value);
      case 'boolean':
        return Boolean(value);
      case 'object':
        return JSON.parse(value);
      default:
        return value;
    }
  }

  identify(_, item) {
    return item.value;
  }

  isValueEmpty(value) {
    if (this.allowMultiple) {
      return !(value && value.length);
    }

    return isEmpty(value);
  }
}
