import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { IMember, IPagination } from '../interfaces';
import { setPaginationHeaders } from './pagination-helpers';
import { ILikesParams } from '../interfaces/likes-params.interface';

@Injectable({
  providedIn: 'root',
})
export class LikesService {
  private readonly baseUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  public likesParams = signal<ILikesParams>({
    predicate: 'liked',
    pageNumber: 1,
    pageSize: 5,
  });

  private paginatedResult = rxResource({
    request: this.likesParams,
    loader: ({ request }) => {
      let params = setPaginationHeaders(request.pageNumber, request.pageSize);
      params = params.append('predicate', request.predicate);

      return this.http
        .get<IMember[]>(`${this.baseUrl}likes`, {
          observe: 'response',
          params,
        })
        .pipe(
          tap(response =>
            this.likesPagination.set(
              JSON.parse(response.headers.get('Pagination')!)
            )
          )
        );
    },
  });

  public likesIds = signal<number[]>([]);
  public likesMembers = computed(() => this.paginatedResult.value()?.body);
  public likesPagination = signal<IPagination | null>(null);

  public toggleLike(targetId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}likes/${targetId}`, {});
  }

  public getLikesIds() {
    return this.http.get<number[]>(`${this.baseUrl}likes/list`).subscribe({
      next: ids => this.likesIds.set(ids),
    });
  }
}
