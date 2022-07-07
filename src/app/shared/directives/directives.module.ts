import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorValidatorDirective } from './error-validator.directive';
import { TranslocoRootModule } from 'src/app/transloco-root.module';



@NgModule({
  declarations: [
    ErrorValidatorDirective
  ],
  imports: [
    CommonModule,
    TranslocoRootModule
  ],
  exports: [ErrorValidatorDirective]
})
export class DirectivesModule { }
