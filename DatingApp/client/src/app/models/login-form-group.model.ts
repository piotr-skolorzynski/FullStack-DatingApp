import { FormControl } from '@angular/forms';

export type LoginFormGroup = {
  username: FormControl<string>;
  password: FormControl<string>;
};
