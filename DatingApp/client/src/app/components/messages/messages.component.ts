import { Component, inject, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-messages',
  imports: [],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
})
export class MessagesComponent implements OnInit {
  private readonly messageService = inject(MessageService);
  public messages = this.messageService.messages;
  public messagesParams = this.messageService.messagesParams;

  public ngOnInit(): void {
    this.setMessagesParamsContainer('Inbox');
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
}
