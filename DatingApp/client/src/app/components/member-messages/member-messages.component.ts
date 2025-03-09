import { Component, effect, inject, input, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { TimeagoModule } from 'ngx-timeago';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css',
  imports: [TimeagoModule],
})
export class MemberMessagesComponent implements OnInit {
  public username = input.required<string>();

  private readonly messageService = inject(MessageService);
  private usernameForThread = this.messageService.usernameForThread;

  public threadMessages = this.messageService.threadMessages;

  public ngOnInit(): void {
    this.usernameForThread.set(this.username());
  }
}
