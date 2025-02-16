import { Component, inject, OnInit } from '@angular/core';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';
import { MembersService } from '../../services';
import { MemberCardComponent } from '../member-card/member-card.component';

@Component({
  selector: 'app-member-list',
  imports: [MemberCardComponent, PaginationModule],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css',
})
export class MemberListComponent implements OnInit {
  public readonly memberService = inject(MembersService);
  public pageNumber = 1;
  public pageSize = 5;

  public ngOnInit(): void {
    if (!this.memberService.paginatedResult()) {
      this.loadMembers();
    }
  }

  public pageChanged(event: PageChangedEvent): void {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadMembers();
    }
  }

  private loadMembers(): void {
    this.memberService.getMembers(this.pageNumber, this.pageSize);
  }
}
