import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ILoginCredentials, IUser } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://localhost:5001/api';
  public currentUser = signal<IUser | null>(null);

  public login(credentials: ILoginCredentials): Observable<IUser> {
    return this.http
      .post<IUser>(`${this.baseUrl}/account/login`, credentials)
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
