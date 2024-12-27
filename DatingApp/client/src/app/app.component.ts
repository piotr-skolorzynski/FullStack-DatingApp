import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';
import { HomeComponent } from './pages';
import { NavComponent } from './components';
import { AccountService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [NavComponent, HomeComponent],
})
export class AppComponent implements OnInit {
  private readonly accountService = inject(AccountService);
  private readonly http = inject(HttpClient);
  private readonly url = 'https://localhost:5001/api/users';

  public title = 'Dating App';
  public users = rxResource({
    loader: () => this.http.get<any>(this.url),
  });

  ngOnInit(): void {
    this.setCurrentUser();
  }

  public setCurrentUser(): void {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      return;
    }

    const user = JSON.parse(storedUser);
    this.accountService.currentUser.set(user);
  }
}
