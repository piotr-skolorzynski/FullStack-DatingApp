import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { IMessagesParams } from '../interfaces/messages-params.interface';
import { setPaginationHeaders } from './pagination-helpers';
import { IMessage, IPagination } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private readonly baseUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);
  public messagesPagination = signal<IPagination | null>(null);
  public usernameForThread = signal<string>('');

  public messagesParams = signal<IMessagesParams>({
    container: 'unread',
    pageNumber: 1,
    pageSize: 5,
  });

  public messages = computed(() => this.paginatedResult.value()?.body);

  public threadMessages = computed(() => this.messageThreadResult.value());

  public sendMessage(username: string, content: string): void {
    console.log({
      recipientUsername: username,
      content,
    });

    this.http
      .post<IMessage>(`${this.baseUrl}messages`, {
        recipientUsername: username,
        content,
      })
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
}
