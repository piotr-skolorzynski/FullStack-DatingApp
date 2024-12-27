import { FormControl } from '@angular/forms';

export type RegisterFormGroup = {
  username: FormControl<string>;
  password: FormControl<string>;
};
