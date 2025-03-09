import { Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { GallerizeDirective } from 'ng-gallery/lightbox';
import { TimeagoModule } from 'ngx-timeago';
import * as bootstrap from 'bootstrap';
import { MembersService } from '../../services';
import { MemberMessagesComponent } from '../member-messages/member-messages.component';

@Component({
  selector: 'app-member-details',
  imports: [
    DatePipe,
    GallerizeDirective,
    TimeagoModule,
    MemberMessagesComponent,
  ],
  templateUrl: './member-details.component.html',
  styleUrl: './member-details.component.css',
})
export class MemberDetailsComponent {
  public username = input<string>('');

  private readonly memberService = inject(MembersService);

  public member = rxResource({
    request: () => this.username(),
    loader: () => this.memberService.getMember(this.username()),
  });
  public isMessageTabActive = false;

  public activateMessageTab(): void {
    this.isMessageTabActive = true;
  }

  public switchToMessageTab(): void {
    this.activateMessageTab();
    const triggerEl = document.querySelector(
      '#memberTab button[data-bs-target="#messages-tab-pane"]'
    );
    if (triggerEl) {
      bootstrap.Tab.getOrCreateInstance(triggerEl).show();
    }
  }
}
