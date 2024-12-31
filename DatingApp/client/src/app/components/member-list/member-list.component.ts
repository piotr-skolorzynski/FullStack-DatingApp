import { Component, inject } from '@angular/core';
import { MembersService } from '../../services';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-member-list',
  imports: [],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css',
})
export class MemberListComponent {
  private readonly memberService = inject(MembersService);

  public members = rxResource({
    loader: () => this.memberService.getMembers(),
  });
}
