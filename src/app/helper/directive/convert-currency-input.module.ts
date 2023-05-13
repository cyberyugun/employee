import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConvertCurrencyInputDirective } from './convert-currency-input.directive';
import { ConvertCurrencyInputPipesModule } from '../pipes/convert-currency-input.module';

const component = [
  ConvertCurrencyInputDirective
];

@NgModule({
  declarations: component,
  exports: component,
  imports: [
    CommonModule,
    ConvertCurrencyInputPipesModule
  ],
  providers: component
})
export class ConvertCurrencyInputDirectiveModule { }
