import { Component, input } from '@angular/core';
import { IMember } from '../../interfaces';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-member-card',
  imports: [RouterLink],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css',
})
export class MemberCardComponent {
  public member = input.required<IMember>();
}
