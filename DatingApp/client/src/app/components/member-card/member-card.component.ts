import { Component, input } from '@angular/core';
import { IMember } from '../../interfaces';

@Component({
  selector: 'app-member-card',
  imports: [],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css',
})
export class MemberCardComponent {
  public member = input.required<IMember>();
}
