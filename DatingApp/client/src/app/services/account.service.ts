import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ILoginCredentials, IUser } from '../interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;
  public currentUser = signal<IUser | null>(null);

  public register(credentials: ILoginCredentials): Observable<IUser> {
    return this.http
      .post<IUser>(`${this.baseUrl}account/register`, credentials)
      .pipe(
        map(user => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUser.set(user);
          }

          return user;
        })
      );
  }

  public login(credentials: ILoginCredentials): Observable<IUser> {
    return this.http
      .post<IUser>(`${this.baseUrl}account/login`, credentials)
      .pipe(
        map(user => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUser.set(user);
          }

          return user;
        })
      );
  }

  public logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
