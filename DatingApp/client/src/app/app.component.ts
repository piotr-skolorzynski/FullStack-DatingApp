import { Component, inject, OnInit } from '@angular/core';
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

  public ngOnInit(): void {
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
