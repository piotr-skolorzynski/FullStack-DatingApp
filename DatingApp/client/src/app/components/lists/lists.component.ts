import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';
import { LikesService } from '../../services/likes.service';
import { MemberCardComponent } from '../member-card/member-card.component';
import { Predicate } from '../../models';

@Component({
  selector: 'app-lists',
  imports: [MemberCardComponent, PaginationModule, FormsModule],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css',
})
export class ListsComponent implements OnInit {
  public likesService = inject(LikesService);
  public likesParams = this.likesService.likesParams;
  public likesMemebers = this.likesService.likesMembers;
  public likesPagination = this.likesService.likesPagination;

  public ngOnInit(): void {
    this.setPredicate('liked');
  }

  public getTitle(): string {
    switch (this.likesParams().predicate) {
      case 'liked':
        return 'Members you like';
      case 'likedBy':
        return 'Members who like you';
      default:
        return 'Mutual';
    }
  }

  public setPredicate(predicate: Predicate): void {
    this.likesParams.update(likesParams => ({ ...likesParams, predicate }));
  }

  public onPageChange(event: PageChangedEvent): void {
    if (this.likesParams().pageNumber !== event.page) {
      this.likesParams.update(likesParams => ({
        ...likesParams,
        pageNumber: event.page,
      }));
    }
  }
}
