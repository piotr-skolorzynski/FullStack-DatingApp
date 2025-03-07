import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';
import { environment } from '../../environments/environment';
import { IMessagesParams } from '../interfaces/messages-params.interface';
import { setPaginationHeaders } from './pagination-helpers';
import { IMessage, IPagination } from '../interfaces';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private readonly baseUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);
  public messagesPagination = signal<IPagination | null>(null);

  //do przemyślenia
  public messagesParams = signal<IMessagesParams>({
    container: 'unread',
    pageNumber: 1,
    pageSize: 5,
  });
  public messages = computed(() => this.paginatedResult.value()?.body);

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
}
