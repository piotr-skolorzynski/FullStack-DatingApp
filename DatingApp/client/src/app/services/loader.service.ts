import { inject, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  public loadingRequestCount = 0;
  private readonly spinnerService = inject(NgxSpinnerService);

  public loading(): void {
    this.loadingRequestCount++;
    this.spinnerService.show(undefined, {
      type: 'square-jelly-box',
      size: 'large',
      color: '#2196f3',
      bdColor: '#fff',
    });
  }

  public dispose(): void {
    this.loadingRequestCount--;
    if (this.loadingRequestCount <= 0) {
      this.loadingRequestCount = 0;
      this.spinnerService.hide();
    }
  }
}
