import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerFormatDirective } from './date-pricker-format.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DatePickerFormatDirective],
  exports: [DatePickerFormatDirective]
})
export class DatePickerFormatModule { }
