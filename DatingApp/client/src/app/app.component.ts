import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { NavComponent } from './nav/nav.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [NavComponent],
})
export class AppComponent {
  private readonly http = inject(HttpClient);
  private readonly url = 'https://localhost:5001/api/users';

  public title = 'Dating App';
  public users = rxResource({
    loader: () => this.http.get<any>(this.url),
  });
}
