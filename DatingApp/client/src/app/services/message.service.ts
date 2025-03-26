import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from '@microsoft/signalr';
import { environment } from '../../environments/environment';
import { IMessagesParams } from '../interfaces/messages-params.interface';
import { setPaginationHeaders } from './pagination-helpers';
import { IMessage, IPagination, IUser } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private readonly baseUrl = environment.apiUrl;
  private readonly hubUrl = environment.hubsUrl;
  private readonly http = inject(HttpClient);
  public hubConnection?: HubConnection;
  public messagesPagination = signal<IPagination | null>(null);
  public usernameForThread = signal<string>('');
  public messageThread = signal<IMessage[]>([]);

  public messagesParams = signal<IMessagesParams>({
    container: 'unread',
    pageNumber: 1,
    pageSize: 5,
  });

  public messages = computed(() => this.paginatedResult.value()?.body);

  public threadMessages = computed(() => this.messageThreadResult.value());

  public async sendMessage(username: string, content: string): Promise<any> {
    return await this.hubConnection?.invoke('SendMessage', {
      recipientUsername: username,
      content,
    });
  }

  public deleteMessage(id: number): void {
    this.http
      .delete(`${this.baseUrl}messages/${id}`)
      .pipe(tap(() => this.paginatedResult.reload()))
      .subscribe();
  }

  private paginatedResult = rxResource({
    request: this.messagesParams,
    loader: ({ request }) => {
      let params = setPaginationHeaders(request.pageNumber, request.pageSize);
      params = params.append('Container', request.container);

      return this.http
        .get<IMessage[]>(`${this.baseUrl}messages`, {
          observe: 'response',
          params,
        })
        .pipe(
          tap(response =>
            this.messagesPagination.set(
              JSON.parse(response.headers.get('Pagination')!)
            )
          )
        );
    },
  });

  private messageThreadResult = rxResource({
    request: () => ({ username: this.usernameForThread() }),
    loader: ({ request }) =>
      this.http.get<IMessage[]>(
        `${this.baseUrl}messages/thread/${request.username}`
      ),
  });

  public createHubConnection(user: IUser, otherUsername: string): void {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${this.hubUrl}message?user=${otherUsername}`, {
        accessTokenFactory: () => user.token,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch(error => console.log(error));

    this.hubConnection.on('ReceivedMessageThread', messages =>
      this.messageThread.set(messages)
    );

    this.hubConnection.on('NewMessage', message => {
      this.messageThread.update(messages => [...messages, message]);
    });
  }

  public stopHubConnection(): void {
    if (this.hubConnection?.state === HubConnectionState.Connected) {
      this.hubConnection.stop().catch(error => console.log(error));
    }
  }
}
