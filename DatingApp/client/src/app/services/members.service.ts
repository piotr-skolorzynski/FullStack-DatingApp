import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMember } from '../interfaces';
import { environment } from '../../environments/environment';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private readonly http = inject(HttpClient);
  private readonly accountService = inject(AccountService);
  private readonly baseUrl = environment.apiUrl;

  // public users = rxResource({
  //   loader: () => this.http.get<any[]>(this.url),
  // });

  public getMembers(): Observable<IMember[]> {
    return this.http.get<IMember[]>(
      `${this.baseUrl}users`,
      this.getHttpOptions()
    );
  }

  public getMember(username: string): Observable<IMember> {
    return this.http.get<IMember>(
      `${this.baseUrl}users/${username}`,
      this.getHttpOptions()
    );
  }

  //provides header with authorization token
  private getHttpOptions(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.accountService.currentUser()?.token}`,
      }),
    };
  }
}
