import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { LikesService } from '../../services/likes.service';
import { MemberCardComponent } from '../member-card/member-card.component';

type Predicate = 'liked' | 'likedBy' | 'mutual';

@Component({
  selector: 'app-lists',
  imports: [MemberCardComponent],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css',
})
export class ListsComponent {
  private likeService = inject(LikesService);
  public members = rxResource({
    request: () => this.predicate(),
    loader: () => this.likeService.getLikes(this.predicate()),
  });
  public predicate = signal<Predicate>('liked');

  public getTitle(): string {
    switch (this.predicate()) {
      case 'liked':
        return 'Members you like';
      case 'likedBy':
        return 'Members who like you';
      default:
        return 'Mutual';
    }
  }

  public setPredicate(predicate: Predicate): void {
    this.predicate.set(predicate);
  }
}
