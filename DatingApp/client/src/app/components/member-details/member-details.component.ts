import {
  AfterViewInit,
  Component,
  computed,
  inject,
  input,
  OnDestroy,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { GallerizeDirective } from 'ng-gallery/lightbox';
import { TimeagoModule } from 'ngx-timeago';
import * as bootstrap from 'bootstrap';
import { MembersService, PresenceService } from '../../services';
import { MemberMessagesComponent } from '../member-messages/member-messages.component';
import { ActivatedRoute } from '@angular/router';

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
export class MemberDetailsComponent implements AfterViewInit, OnDestroy {
  public username = input<string>('');

  private readonly memberService = inject(MembersService);
  private readonly route = inject(ActivatedRoute);
  private subscription = new Subscription();
  private readonly presenceService = inject(PresenceService);

  public isOnline = computed(() =>
    this.presenceService
      .onlineUsers()
      .includes(this.member.value()?.username ?? '')
  );
  public member = rxResource({
    request: () => this.username(),
    loader: () => this.memberService.getMember(this.username()),
  });
  public isMessageTabActive = false;

  public ngAfterViewInit(): void {
    this.subscription.add(
      this.route.queryParams.subscribe({
        next: params => {
          if (params['tab'] === 'Messages') {
            setTimeout(() => this.switchToMessageTab(), 100);
          }
        },
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public activateMessageTab(): void {
    this.isMessageTabActive = true;
  }

  public switchToMessageTab(): void {
    if (!this.isMessageTabActive) {
      this.activateMessageTab();
    }

    const triggerEl = document.querySelector(
      '#memberTab button[data-bs-target="#messages-tab-pane"]'
    );

    if (triggerEl) {
      bootstrap.Tab.getOrCreateInstance(triggerEl).show();
    }
  }
}
