import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';
import { TimeagoModule } from 'ngx-timeago';
import { MessageService } from '../../services/message.service';
import { IMessage } from '../../interfaces';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-messages',
  imports: [FormsModule, PaginationModule, RouterLink, TimeagoModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
})
export class MessagesComponent implements OnInit {
  public readonly messageService = inject(MessageService);
  public messages = this.messageService.messages;
  public messagesParams = this.messageService.messagesParams;
  public messagesPagination = this.messageService.messagesPagination;

  public ngOnInit(): void {
    this.setMessagesParamsContainer('Inbox');
  }

  public getRoute(message: IMessage): string {
    if (this.messagesParams().container === 'Outbox') {
      return `/members/${message.recipientUsername}`;
    }

    return `/members/${message.senderUsername}`;
  }

  public setMessagesParamsContainer(container: string): void {
    this.messagesParams.update(params => ({ ...params, container }));
  }

  public onPageChange(event: PageChangedEvent): void {
    if (this.messagesParams().pageNumber !== event.page) {
      this.messagesParams.update(messagesParams => ({
        ...messagesParams,
        pageNumber: event.page,
      }));
    }
  }

  public deleteMessage(id: number): void {
    this.messageService.deleteMessage(id);
  }
}
