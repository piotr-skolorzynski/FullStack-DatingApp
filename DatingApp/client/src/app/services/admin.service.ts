import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IUser } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  public getUsersWithRoles(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.baseUrl}admin/users-with-roles`);
  }

  public updateUserRoles(
    username: string,
    roles: string[]
  ): Observable<string[]> {
    return this.http.post<string[]>(
      `${this.baseUrl}admin/edit-roles/${username}?roles=${roles}`,
      {}
    );
  }
}
