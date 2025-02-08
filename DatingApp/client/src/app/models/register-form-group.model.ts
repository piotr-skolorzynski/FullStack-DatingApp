import { FormControl } from '@angular/forms';
import { Gender } from '../enums/gender.enum';

export type RegisterFormGroup = {
  gender: FormControl<Gender>;
  username: FormControl<string>;
  knownAs: FormControl<string>;
  dateOfBirth: FormControl<string>;
  city: FormControl<string>;
  country: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
};
