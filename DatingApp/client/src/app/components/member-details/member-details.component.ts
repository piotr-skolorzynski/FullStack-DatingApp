import { Component, inject, input, OnDestroy, OnInit } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { GallerizeDirective } from 'ng-gallery/lightbox';
import { TimeagoModule } from 'ngx-timeago';
import * as bootstrap from 'bootstrap';
import { MembersService } from '../../services';
import { MemberMessagesComponent } from '../member-messages/member-messages.component';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

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
export class MemberDetailsComponent implements OnInit, OnDestroy {
  public username = input<string>('');

  private readonly memberService = inject(MembersService);
  private readonly route = inject(ActivatedRoute);
  private subscription = new Subscription();

  public member = rxResource({
    request: () => this.username(),
    loader: () => this.memberService.getMember(this.username()),
  });
  public isMessageTabActive = false;

  public ngOnInit(): void {
    this.subscription.add(
      this.route.queryParams.subscribe({
        next: params => {
          console.log(params['tab']);
          if (params['tab'] === 'Messages') {
            this.switchToMessageTab();
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
