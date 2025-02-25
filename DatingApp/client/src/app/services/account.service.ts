import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ILoginCredentials, IUser } from '../interfaces';
import { environment } from '../../environments/environment';
import { LikesService } from './likes.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;
  public readonly likeService = inject(LikesService);
  public currentUser = signal<IUser | null>(null);

  public register(credentials: ILoginCredentials): Observable<IUser> {
    return this.http
      .post<IUser>(`${this.baseUrl}account/register`, credentials)
      .pipe(
        map(user => {
          if (user) {
            this.setCurrentUser(user);
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
            this.setCurrentUser(user);
          }

          return user;
        })
      );
  }

  public setCurrentUser(user: IUser) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);
    this.likeService.getLikesIds();
  }

  public logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
