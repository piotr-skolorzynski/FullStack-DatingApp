import { Component, inject, input, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { TimeagoModule } from 'ngx-timeago';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css',
  imports: [TimeagoModule],
})
export class MemberMessagesComponent {
  public username = input.required<string>();
  private readonly messageService = inject(MessageService);

  public threadMessages = this.messageService.threadMessages;
}
