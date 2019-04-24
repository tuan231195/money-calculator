import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { forwardRef, Provider } from '@angular/core';

export abstract class AbstractValueAccessor<T> implements ControlValueAccessor {
  isDisabled: boolean;
  onChange = _ => {};
  onTouched = () => {};
  _value: T;

  get value() {
    return this._value;
  }

  set value(value: T) {
    if (value !== this._value) {
      this._value = value;
      this.onValueUpdated(value);
      this.onChange(value);
    }
  }

  writeValue(value: T): void {
    this._value = value;
    this.onValueUpdated(value);
    this.onChange(value);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    this.onDisabled(isDisabled);
  }

  onDisabled(_){}

  onValueUpdated(_) {}
}

export function makeValueAccessor(type: any): Provider {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => type),
    multi: true,
  };
}
