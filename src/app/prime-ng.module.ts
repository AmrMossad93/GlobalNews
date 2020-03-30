import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccordionModule} from 'primeng/accordion';
import {DialogModule} from 'primeng/dialog';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AccordionModule,
    DialogModule
  ],
  exports: [
    AccordionModule,
    DialogModule
  ]
})
export class PrimeNGModule {
}
