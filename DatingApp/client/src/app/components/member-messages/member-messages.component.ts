import { Component, inject, input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TimeagoModule } from 'ngx-timeago';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css',
  imports: [FormsModule, TimeagoModule],
})
export class MemberMessagesComponent implements OnInit {
  public username = input.required<string>();

  private readonly messageService = inject(MessageService);
  private usernameForThread = this.messageService.usernameForThread;

  public messageContent = '';
  public threadMessages = this.messageService.threadMessages;

  public ngOnInit(): void {
    this.usernameForThread.set(this.username());
  }

  public sendMessage(): void {
    this.messageService.sendMessage(this.username(), this.messageContent);
    this.messageContent = '';
  }
}
