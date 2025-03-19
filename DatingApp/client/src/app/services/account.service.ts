import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ILoginCredentials, IUser } from '../interfaces';
import { environment } from '../../environments/environment';
import { LikesService } from './likes.service';
import { PresenceService } from './presence.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;
  public readonly likeService = inject(LikesService);
  private readonly presenceService = inject(PresenceService);
  public currentUser = signal<IUser | null>(null);
  public roles = computed(() => {
    const user = this.currentUser();

    if (user && user.token) {
      const role = JSON.parse(atob(user.token.split('.')[1])).role;
      return Array.isArray(role) ? role : [role];
    }

    return null;
  });

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
    this.presenceService.createHubConnection(user);
  }

  public logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
    this.presenceService.stopHubConnection();
  }
}
