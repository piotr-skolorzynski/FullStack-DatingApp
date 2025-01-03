import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { LIGHTBOX_CONFIG, LightboxConfig } from 'ng-gallery/lightbox';

import { routes } from './app.routes';
import { errorInterceptor, jwtInterceptor } from './interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([errorInterceptor, jwtInterceptor])),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-bottom-right',
    }),
    {
      provide: LIGHTBOX_CONFIG,
      useValue: {
        keyboardShortcuts: false,
        exitAnimationTime: 1000,
      } as LightboxConfig,
    },
  ],
};
