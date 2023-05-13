import { formatNumber, registerLocaleData } from '@angular/common';
import { Directive, HostListener, ElementRef, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import localeId from '@angular/common/locales/id';
registerLocaleData(localeId, 'id');

@Directive({
  selector: '[appMycurrency]'
})
export class ConvertCurrencyInputDirective implements ControlValueAccessor {
  locale = 'id-ID';
  decimalMarker: string = ',';
  thousandSeparator: string = '';
  public el: any;

  constructor(private element: ElementRef<HTMLInputElement>) {
  }

  private _value: string | null = '';

  get value(): string | null {
    return this._value;
  }

  @Input()
  set value(value: string | null) {
    this._value = value;
    this.formatValue(value);
  }
  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const e = <KeyboardEvent> event;
    if (['Delete', 'Backspace', 'Tab', 'Escape', 'Enter', 'Period', 'NumpadDecimal'].indexOf(e.key) !== -1 ||
        // Allow: Ctrl+A
        (e.key === 'a' && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+C
        (e.key === 'c' && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+V
        (e.key === 'v' && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+X
        (e.key === 'x' && (e.ctrlKey || e.metaKey)) ||
        // Allow: home, end, left, right
        (e.key === 'Home' || e.key === 'End' || e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        // let it happen, don't do anything
        return;
    }
    const isNumber = /^\d+$/.test(e.key);
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (!isNumber)) && (!isNumber)) {
        e.preventDefault();
    }
  }
  @HostListener('paste', ['$event']) onPaste(event: any) {
    const clipboardData = event.clipboardData;
    const pastedText = clipboardData.getData('text');
    if (!/^[0-9]+$/.test(pastedText)) return event.preventDefault();
  }

  @HostListener('input', ['$event.target.value'])
  input(value: string) {
    //Find all numerics, decimal marker(, or .) and -
    //It will delete thousandSeparator cos it's always opposite to decimal marker
    const regExp = new RegExp(`[^\\d${this.decimalMarker}-]`, 'g');
    //Separate value on before and after decimal marker
    const [integer, decimal] = value.replace(regExp, '').split(this.decimalMarker);

    //Send non localized value, with dot as decimalMarker to API
    this._value = decimal ? integer.concat('.', decimal) : integer;

    // If decimal separator is last character don't update
    // because it will delete . || ,
    if (this.isLastCharacterDecimalSeparator(value)) {
      this._value = value;
    }

    // here to notify Angular Validators
    this._onChange(this._value);
  }

  @HostListener('focus')
  onFocus() {
    this.unFormatValue();
  }

  @HostListener('blur')
  _onBlur() {
    /**
     * Adding thousand separators
     */
    this.formatValue(this._value);
  }

  _onChange(value: any): void {
    return value;
  }

  /**
   * @param value
   * apply formatting on value assignment
   */
  writeValue(value: any) {
    this._value = value;
    this.formatValue(this._value);
  }

  registerOnChange(fn: (value: any)=> void) {
    this._onChange = fn;
  }

  registerOnTouched() {
    const value = 'a';
    return value;
  }

  isLastCharacterDecimalSeparator(value: any) {
    if (value) {
      return isNaN(value[value.length - 1]);
    }
    return true;
  }


  private formatValue(value: string | null) {
    if (value === null) {
      this.element.nativeElement.value = '';
      return;
    }

    if (this.isLastCharacterDecimalSeparator(value)) {
      return;
    }

    // Conclude the decimal and thousand separators from locale
    const [thousandSeparator, decimalMarker] = formatNumber(1000.99, this.locale).replace(/\d/g, '');
    this.decimalMarker = decimalMarker;

    this.thousandSeparator = thousandSeparator;
    //Here value should always come with . as decimal marker thus any other behavior is bug
    const [integer, decimal] = value.split('.');

    //Group every three elements, and add thousandSeparator after them
    this.element.nativeElement.value = Number(integer).toLocaleString(['ban', 'id']);

    //Add decimals and decimalMarker if any
    if (decimal) {
      this.element.nativeElement.value = this.element.nativeElement.value.concat(decimalMarker, decimal);
    }
  }

  private unFormatValue() {
    const value = this.element.nativeElement.value;
    if (this.isLastCharacterDecimalSeparator(value)) {
      return;
    }
    const regExp = new RegExp(`[^\\d${this.decimalMarker}-]`, 'g');
    const [integer, decimal] = value.replace(regExp, '').split(this.decimalMarker);
    if (decimal) {
      this._value = integer.concat('.', decimal);
    } else {
      this._value = integer;
    }
    if (value) {
      this.element.nativeElement.value = this._value;
    } else {
      this.element.nativeElement.value = '';
    }
  }
}
