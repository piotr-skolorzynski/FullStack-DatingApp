import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../services';
import { MemberCardComponent } from '../member-card/member-card.component';

@Component({
  selector: 'app-member-list',
  imports: [MemberCardComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css',
})
export class MemberListComponent implements OnInit {
  public readonly memberService = inject(MembersService);

  public ngOnInit(): void {
    if (!this.memberService.members().length) {
      this.memberService.getMembers();
    }
  }
}
