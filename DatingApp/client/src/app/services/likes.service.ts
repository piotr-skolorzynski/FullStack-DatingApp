import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMember } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class LikesService {
  private readonly baseUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);
  public likesIds = signal<number[]>([]);

  public toggleLike(targetId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}likes/${targetId}`, {});
  }

  public getLikes(predicate: string): Observable<IMember[]> {
    return this.http.get<IMember[]>(
      `${this.baseUrl}likes?predicate=${predicate}`
    );
  }

  public getLikesIds() {
    return this.http.get<number[]>(`${this.baseUrl}likes/list`).subscribe({
      next: ids => this.likesIds.set(ids),
    });
  }
}
