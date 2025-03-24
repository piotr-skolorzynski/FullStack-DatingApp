import { Component, inject, input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TimeagoModule } from 'ngx-timeago';
import { MessageService } from '../../services/message.service';
import { AccountService } from '../../services';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css',
  imports: [FormsModule, TimeagoModule],
})
export class MemberMessagesComponent implements OnInit, OnDestroy {
  public username = input.required<string>();

  private readonly messageService = inject(MessageService);
  private readonly accountService = inject(AccountService);
  private usernameForThread = this.messageService.usernameForThread;

  public messageContent = '';
  public threadMessages = this.messageService.threadMessages;

  public messageThread = this.messageService.messageThread;

  public ngOnInit(): void {
    this.usernameForThread.set(this.username());
    const user = this.accountService.currentUser();
    if (user && this.username()) {
      this.messageService.createHubConnection(user, this.username());
    } else {
      this.messageService.stopHubConnection();
    }
  }

  public ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }

  public sendMessage(): void {
    this.messageService.sendMessage(this.username(), this.messageContent);
    this.messageContent = '';
  }
}
