import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { IMember } from '../interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  public members = signal<IMember[]>([]);

  public getMembers(): void {
    this.http.get<IMember[]>(`${this.baseUrl}users`).subscribe({
      next: members => this.members.set(members),
    });
  }

  public getMember(username: string): Observable<IMember> {
    const member = this.members().find(member => member.username === username);
    if (member) {
      return of(member);
    }

    return this.http.get<IMember>(`${this.baseUrl}users/${username}`);
  }

  public updateMember(member: IMember): Observable<any> {
    return this.http
      .put(`${this.baseUrl}users`, member)
      .pipe(
        tap(() =>
          this.members.update(members =>
            members.map(m => (m.username === member.username ? member : m))
          )
        )
      );
  }
}
