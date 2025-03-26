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
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GallerizeDirective } from 'ng-gallery/lightbox';
import { TimeagoModule } from 'ngx-timeago';
import * as bootstrap from 'bootstrap';
import {
  AccountService,
  MembersService,
  PresenceService,
} from '../../services';
import { MemberMessagesComponent } from '../member-messages/member-messages.component';
import { MessageService } from '../../services/message.service';
import { HubConnectionState } from '@microsoft/signalr';

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
  private readonly router = inject(Router);
  private readonly accountService = inject(AccountService);
  private readonly presenceService = inject(PresenceService);
  private readonly messageService = inject(MessageService);
  private subscription = new Subscription();

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
            this.onRouteParamsChange();
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
    this.setParam('Messages');
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

  public onRouteParamsChange(): void {
    const user = this.accountService.currentUser();
    if (!user) {
      return;
    }

    if (
      this.messageService.hubConnection?.state === HubConnectionState.Connected
    ) {
      this.messageService.hubConnection.stop().then(() => {
        this.messageService.createHubConnection(user, this.username());
      });
    }
  }

  public setParam(paramName: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: paramName },
      queryParamsHandling: 'merge',
    });
  }
}
