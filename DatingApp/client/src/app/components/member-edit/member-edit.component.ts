import { Component, inject } from '@angular/core';
import { AccountService, MembersService } from '../../services';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-member-edit',
  imports: [],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css',
})
export class MemberEditComponent {
  private readonly memberService = inject(MembersService);
  private readonly username = inject(AccountService).currentUser;

  public member = rxResource({
    request: () => this.username,
    loader: () => this.memberService.getMember(this.username()?.username ?? ''),
  });
}
