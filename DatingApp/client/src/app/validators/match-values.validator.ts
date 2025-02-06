import { AbstractControl, ValidatorFn } from '@angular/forms';

export const matchValues =
  (matchTo: string): ValidatorFn =>
  (control: AbstractControl) =>
    control.value === control.parent?.get(matchTo)?.value
      ? null
      : { isMatching: true };
