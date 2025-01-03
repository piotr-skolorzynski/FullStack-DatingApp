import { Component, effect, inject, input } from '@angular/core';
import { MembersService } from '../../services';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-member-details',
  imports: [],
  templateUrl: './member-details.component.html',
  styleUrl: './member-details.component.css',
})
export class MemberDetailsComponent {
  public username = input<string>('');
  private readonly memberService = inject(MembersService);
  public member = rxResource({
    request: () => this.username(),
    loader: () => this.memberService.getMember(this.username()),
  });
}
