import { Component, inject, OnInit } from '@angular/core';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';
import { AccountService, MembersService } from '../../services';
import { MemberCardComponent } from '../member-card/member-card.component';
import { UserParams } from '../../models';

@Component({
  selector: 'app-member-list',
  imports: [MemberCardComponent, PaginationModule],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css',
})
export class MemberListComponent implements OnInit {
  private readonly accountService = inject(AccountService);
  public readonly memberService = inject(MembersService);
  private userParams = new UserParams(this.accountService.currentUser());

  public ngOnInit(): void {
    if (!this.memberService.paginatedResult()) {
      this.loadMembers();
    }
  }

  public pageChanged(event: PageChangedEvent): void {
    if (this.userParams.pageNumber !== event.page) {
      this.userParams.pageNumber = event.page;
      this.loadMembers();
    }
  }

  private loadMembers(): void {
    this.memberService.getMembers(this.userParams);
  }
}
