import { CanDeactivateFn } from '@angular/router';
import { MemberEditComponent } from '../components';

export const preventUnsavedChangesGuard: CanDeactivateFn<
  MemberEditComponent
> = component => {
  if (component.memberForm.dirty) {
    return confirm(
      'Are you sure you want to continue? Any unsaved changes will be lost'
    );
  }

  return true;
};
