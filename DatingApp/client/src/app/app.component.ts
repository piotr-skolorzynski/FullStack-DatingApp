import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  public title = 'Dating App';
  public users: any;
  private readonly http = inject(HttpClient);

  public ngOnInit(): void {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: response => (this.users = response),
      error: error => console.log(error),
      complete: () => console.log('Request has completed'),
    });
  }
}
