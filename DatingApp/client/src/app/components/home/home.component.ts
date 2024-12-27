import { Component } from '@angular/core';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-home',
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  public registerMode = false;

  public toggleRegisterMode(): void {
    this.registerMode = !this.registerMode;
  }
}
