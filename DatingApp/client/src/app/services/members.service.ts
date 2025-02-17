import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMember, IPhoto } from '../interfaces';
import { PaginatedResult, UserParams } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  // public members = signal<IMember[]>([]);
  public paginatedResult = signal<PaginatedResult<IMember[]> | null>(null);

  public getMembers(userParams: UserParams): void {
    let params = this.setPaginationHeaders(
      userParams.pageNumber,
      userParams.pageSize
    );

    params = params.append('minAge', userParams.minAge);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('gender', userParams.gender);

    this.http
      .get<IMember[]>(`${this.baseUrl}users`, { observe: 'response', params })
      .subscribe({
        next: response => {
          this.paginatedResult.set({
            items: response.body as IMember[],
            pagination: JSON.parse(response.headers.get('Pagination')!),
          });
        },
      });
  }

  public getMember(username: string): Observable<IMember> {
    // const member = this.members().find(member => member.username === username);
    // if (member) {
    //   return of(member);
    // }

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

  private setPaginationHeaders(
    pageNumber: number,
    pageSize: number
  ): HttpParams {
    let params = new HttpParams();

    if (pageNumber && pageSize) {
      params = params.append('pageNumber', pageNumber);
      params = params.append('pageSize', pageSize);
    }

    return params;
  }
}
