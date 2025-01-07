import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMember } from '../interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  public getMembers(): Observable<IMember[]> {
    return this.http.get<IMember[]>(`${this.baseUrl}users`);
  }

  public getMember(username: string): Observable<IMember> {
    return this.http.get<IMember>(`${this.baseUrl}users/${username}`);
  }

  public updateMember(member: IMember): Observable<any> {
    return this.http.put(`${this.baseUrl}users`, member);
  }
}
