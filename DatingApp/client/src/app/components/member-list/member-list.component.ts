import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';
import { AccountService, MembersService } from '../../services';
import { UserParams } from '../../models';
import { Gender } from '../../enums';
import { MemberCardComponent } from '../member-card/member-card.component';

@Component({
  selector: 'app-member-list',
  imports: [MemberCardComponent, PaginationModule, FormsModule],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css',
})
export class MemberListComponent implements OnInit {
  private readonly accountService = inject(AccountService);
  private readonly memberService = inject(MembersService);
  public userParams = new UserParams(this.accountService.currentUser());
  public paginatedResult = this.memberService.paginatedResult;
  public genderList = [
    { value: Gender.Male, display: 'Males' },
    { value: Gender.Female, display: 'Females' },
  ];

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

  public resetFilters(): void {
    this.userParams = new UserParams(this.accountService.currentUser());
    this.loadMembers();
  }

  public loadMembers(): void {
    this.memberService.getMembers(this.userParams);
  }
}
