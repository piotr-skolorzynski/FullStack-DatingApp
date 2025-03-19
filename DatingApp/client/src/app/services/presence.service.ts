import { inject, Injectable } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from '@microsoft/signalr';
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
    this.hubConnection.on('UserIsOnline', username => {
      this.toastr.info(username + ' has connected');
    });
    this.hubConnection.on('UserIsOffline', username => {
      this.toastr.warning(username + ' has disconnected');
    });
  }

  public stopHubConnection(): void {
    if (this.hubConnection.state === HubConnectionState.Connected) {
      this.hubConnection.stop();
    }
  }
}
