import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IMember, IPhoto } from '../interfaces';
import { PaginatedResult, UserParams } from '../models';
import { environment } from '../../environments/environment';
import { AccountService } from './account.service';
import {
  setPaginatedResponse,
  setPaginationHeaders,
} from './pagination-helpers';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private readonly http = inject(HttpClient);
  private readonly accountService = inject(AccountService);
  private readonly baseUrl = environment.apiUrl;
  private readonly user = this.accountService.currentUser;

  public paginatedResult = signal<PaginatedResult<IMember[]> | null>(null);
  public memberCache = new Map();
  public userParams = signal<UserParams>(new UserParams(this.user()));

  public resetUserParams(): void {
    this.userParams.set(new UserParams(this.user()));
  }

  public getMembers(): void {
    const response = this.memberCache.get(
      Object.values(this.userParams()).join('-')
    );
    if (response) {
      return setPaginatedResponse(response, this.paginatedResult);
    }

    let params = setPaginationHeaders(
      this.userParams().pageNumber,
      this.userParams().pageSize
    );

    params = params.append('minAge', this.userParams().minAge);
    params = params.append('maxAge', this.userParams().maxAge);
    params = params.append('gender', this.userParams().gender);
    params = params.append('orderBy', this.userParams().orderBy);

    this.http
      .get<IMember[]>(`${this.baseUrl}users`, { observe: 'response', params })
      .subscribe({
        next: response => {
          setPaginatedResponse(response, this.paginatedResult);
          this.memberCache.set(
            Object.values(this.userParams()).join('-'),
            response
          );
        },
      });
  }

  public getMember(username: string): Observable<IMember> {
    const member: IMember = [...this.memberCache.values()]
      .reduce((arr, elem) => arr.concat(elem.body), [])
      .find((m: IMember) => m.username === username);

    if (member) {
      return of(member);
    }

    return this.http.get<IMember>(`${this.baseUrl}users/${username}`);
  }

  public updateMember(member: IMember): Observable<any> {
    return this.http.put(`${this.baseUrl}users`, member);
    // .pipe(
    //   tap(() =>
    //     this.members.update(members =>
    //       members.map(m => (m.username === member.username ? member : m))
    //     )
    //   )
    // );
  }

  public setMainPhoto(photo: IPhoto): Observable<any> {
    return this.http.put(`${this.baseUrl}users/set-main-photo/${photo.id}`, {});
    // .pipe(
    //   tap(() => {
    //     this.members.update(members =>
    //       members.map(member => {
    //         if (member.photos.includes(photo)) {
    //           member.photoUrl = photo.url;
    //         }

    //         return member;
    //       })
    //     );
    //   })
    // );
  }

  public deletePhoto(photo: IPhoto): Observable<any> {
    return this.http.delete(`${this.baseUrl}users/delete-photo/${photo.id}`);
    // .pipe(
    //   tap(() => {
    //     this.members.update(members =>
    //       members.map(m => {
    //         if (m.photos.includes(photo)) {
    //           m.photos = m.photos.filter(p => p.id !== photo.id);
    //         }

    //         return m;
    //       })
    //     );
    //   })
    // );
  }
}
