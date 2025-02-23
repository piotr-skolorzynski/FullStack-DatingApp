import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';
import { MembersService } from '../../services';
import { Gender } from '../../enums';
import { MemberCardComponent } from '../member-card/member-card.component';

@Component({
  selector: 'app-member-list',
  imports: [MemberCardComponent, PaginationModule, FormsModule],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css',
})
export class MemberListComponent implements OnInit {
  public readonly memberService = inject(MembersService);
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
    if (this.memberService.userParams().pageNumber !== event.page) {
      this.memberService.userParams.update(userParams => ({
        ...userParams,
        pageNumber: event.page,
      }));
      this.loadMembers();
    }
  }

  public changeUserParam(event: any, paramName: string): void {
    this.memberService.userParams.update(params => ({
      ...params,
      [paramName]: event.target.value,
    }));
  }

  public loadMembersWithOrder(event: any): void {
    this.memberService.userParams.update(params => ({
      ...params,
      orderBy: event.target.value,
    }));

    this.loadMembers();
  }

  public resetFilters(): void {
    this.memberService.resetUserParams();
    this.loadMembers();
  }

  public loadMembers(): void {
    this.memberService.getMembers();
  }
}
