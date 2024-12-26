import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILoginCredentials } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://localhost:5001/api';

  public login(credentials: ILoginCredentials): any {
    return this.http.post<ILoginCredentials>(
      `${this.baseUrl}/account/login`,
      credentials
    );
  }
}
