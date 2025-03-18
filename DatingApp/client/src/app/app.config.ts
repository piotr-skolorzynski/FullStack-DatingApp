import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LIGHTBOX_CONFIG, LightboxConfig } from 'ng-gallery/lightbox';
import { provideToastr } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TimeagoModule } from 'ngx-timeago';
import { ModalModule } from 'ngx-bootstrap/modal';

import { routes } from './app.routes';
import {
  errorInterceptor,
  jwtInterceptor,
  loadingInterceptor,
} from './interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(
      withInterceptors([errorInterceptor, jwtInterceptor, loadingInterceptor])
    ),
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
    importProvidersFrom(
      NgxSpinnerModule,
      TimeagoModule.forRoot(),
      ModalModule.forRoot()
    ),
  ],
};
