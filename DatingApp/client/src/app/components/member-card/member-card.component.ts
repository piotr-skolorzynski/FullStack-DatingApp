import { Component, computed, inject, input } from '@angular/core';
import { IMember } from '../../interfaces';
import { RouterLink } from '@angular/router';
import { LikesService } from '../../services/likes.service';

@Component({
  selector: 'app-member-card',
  imports: [RouterLink],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css',
})
export class MemberCardComponent {
  private readonly likeService = inject(LikesService);
  public hasLiked = computed(() =>
    this.likeService.likesIds().includes(this.member().id)
  );
  public member = input.required<IMember>();

  public toggleLike(): void {
    this.likeService.toggleLike(this.member().id).subscribe({
      next: () => {
        if (this.hasLiked()) {
          this.likeService.likesIds.update(ids =>
            ids.filter(x => x !== this.member().id)
          );
        } else {
          this.likeService.likesIds.update(ids => [...ids, this.member().id]);
        }
      },
    });
  }
}
