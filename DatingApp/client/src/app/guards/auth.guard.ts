import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../services';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const accountServcie = inject(AccountService);
  const toastr = inject(ToastrService);

  if (accountServcie.currentUser()) {
    return true;
  }

  toastr.error('You shall not pass');

  return false;
};
