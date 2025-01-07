import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { delay, finalize } from 'rxjs';
import { LoaderService } from '../services';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoaderService);

  loadingService.loading();

  return next(req).pipe(
    delay(1000),
    finalize(() => loadingService.dispose())
  );
};
