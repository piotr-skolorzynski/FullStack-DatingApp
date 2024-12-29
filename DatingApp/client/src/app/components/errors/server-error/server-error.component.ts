import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  imports: [],
  templateUrl: './server-error.component.html',
  styleUrl: './server-error.component.css',
})
export class ServerErrorComponent {
  private readonly navigation = inject(Router).getCurrentNavigation(); // dostęp do przesłanych w routingu dodatkowych opcji
  public error = this.navigation?.extras?.state?.['error']; //pobranie samego błędu z opcji
}
