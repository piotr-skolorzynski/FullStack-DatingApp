import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from '@microsoft/signalr';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import { IUser } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class PresenceService {
  private hubUrl = environment.hubsUrl;
  private hubConnection: HubConnection;
  private readonly toastr = inject(ToastrService);
  private readonly router = inject(Router);
  public onlineUsers = signal<string[]>([]);

  public createHubConnection(user: IUser): void {
    //budowa połączenia
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${this.hubUrl}presence`, {
        accessTokenFactory: () => user.token,
      })
      .withAutomaticReconnect()
      .build();

    //uruchomienie połączenia
    this.hubConnection.start().catch(error => console.log(error));

    //reakcja na stworzone w presence hub zdarzenia
    this.hubConnection.on('UserIsOnline', username =>
      this.onlineUsers.update(users => [...users, username])
    );

    this.hubConnection.on('UserIsOffline', username =>
      this.onlineUsers.update(users => users.filter(user => user !== username))
    );

    this.hubConnection.on('GetOnlineUsers', usernames =>
      this.onlineUsers.set(usernames)
    );

    this.hubConnection.on('NewMessageReceived', ({ username, knownAs }) => {
      this.toastr
        .info(knownAs + ' has sent you a new message! Click me to see it')
        .onTap.pipe(take(1))
        .subscribe(() =>
          this.router.navigateByUrl('/members/' + username + '?tab=Messages')
        );
    });
  }

  public stopHubConnection(): void {
    if (this.hubConnection.state === HubConnectionState.Connected) {
      this.hubConnection.stop();
    }
  }
}
