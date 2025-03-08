import { Component, inject, input, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css',
})
export class MemberMessagesComponent {
  private readonly messageService = inject(MessageService);

  public threadMessages = this.messageService.threadMessages;
}
