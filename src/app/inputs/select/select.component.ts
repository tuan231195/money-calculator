/// <reference types="jquery" />
/// <reference types="semantic-ui" />
import { Component, Input, AfterViewInit, ElementRef, OnChanges, DoCheck } from '@angular/core';
import {
  makeValueAccessor,
  AbstractValueAccessor,
} from 'src/app/core/inputs/abstract-value-accessor';

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

  select: any;

  constructor(private elementRef: ElementRef) {
    super();
  }

  ngAfterViewInit() {
    const select = $(this.elementRef.nativeElement).find('.ui.dropdown');
    select.dropdown();
    select.on('blur', () => {
      this.onTouched();
    })
  }

  onDisabled(isDisabled){
    super.onDisabled(isDisabled);
    $(this.elementRef.nativeElement).find('.ui.dropdown').toggleClass('disabled', isDisabled);
  }
}
