import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../services';

export const adminGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toastr = inject(ToastrService);
  const roles = accountService.roles;

  if (roles()?.includes('Admin') || roles()?.includes('Moderator')) {
    return true;
  }

  toastr.error('You cannot enter this area');
  return false;
};
