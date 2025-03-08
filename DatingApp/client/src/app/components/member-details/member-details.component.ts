import { Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { GallerizeDirective } from 'ng-gallery/lightbox';
import { TimeagoModule } from 'ngx-timeago';
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
}
